const MAX_BODY_BYTES = 1_000_000;
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const COOKIE = "__Host-aakruti_admin";

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: {
    "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store",
    "X-Content-Type-Options":"nosniff", "Referrer-Policy":"same-origin",
    "Content-Security-Policy":"default-src 'none'; frame-ancestors 'none'", ...headers
  }});
}
function response(body,status=200,headers={}) { return new Response(body,{status,headers:{"X-Content-Type-Options":"nosniff",...headers}}); }
function cookieValue(request,name) {
  const raw=request.headers.get("Cookie")||"";
  const item=raw.split(";").map(s=>s.trim()).find(s=>s.startsWith(name+"="));
  return item ? item.slice(name.length+1) : "";
}
function b64url(bytes) {
  let s=""; for(const b of new Uint8Array(bytes)) s+=String.fromCharCode(b);
  return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function fromB64url(s) {
  s=s.replace(/-/g,"+").replace(/_/g,"/");
  while(s.length%4)s+="=";
  return Uint8Array.from(atob(s),c=>c.charCodeAt(0));
}
async function sign(value,secret) {
  const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
  return b64url(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(value)));
}
async function issueSession(env) {
  const payload=b64url(new TextEncoder().encode(JSON.stringify({sub:"owner",exp:Math.floor(Date.now()/1000)+SESSION_TTL_SECONDS})));
  return payload+"."+await sign(payload,env.SESSION_SECRET);
}
async function isAdmin(request,env) {
  if(!env.SESSION_SECRET)return false;
  const token=cookieValue(request,COOKIE), parts=token.split(".");
  if(parts.length!==2)return false;
  const expected=await sign(parts[0],env.SESSION_SECRET);
  if(expected.length!==parts[1].length)return false;
  let diff=0; for(let i=0;i<expected.length;i++)diff|=expected.charCodeAt(i)^parts[1].charCodeAt(i);
  if(diff)return false;
  try { const p=JSON.parse(new TextDecoder().decode(fromB64url(parts[0]))); return p.sub==="owner"&&p.exp>Math.floor(Date.now()/1000); } catch { return false; }
}
function safeString(v,max=5000){return String(v??"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,"").trim().slice(0,max);}
function slug(v){return safeString(v,80).toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");}
async function bodyJson(request) {
  const len=Number(request.headers.get("content-length")||0);
  if(len>MAX_BODY_BYTES)throw new Error("Request too large");
  const text=await request.text(); if(new TextEncoder().encode(text).byteLength>MAX_BODY_BYTES)throw new Error("Request too large");
  return JSON.parse(text||"{}");
}
async function all(db,sql,...args){return (await db.prepare(sql).bind(...args).all()).results||[];}
function publicProduct(row){return {...row,featured:!!row.featured,published:!!row.published,images:JSON.parse(row.images||"[]")};}
function publicReview(row){return {...row,approved:!!row.approved,featured:!!row.featured};}
async function requireDb(env){if(!env.DB)throw new Error("Cloudflare D1 binding DB is not configured");}
async function handle(request,env,url) {
 const path=url.pathname, method=request.method;
 if(path==="/api/admin/login"&&method==="POST"){
   if(!env.ADMIN_USERNAME||!env.ADMIN_PASSWORD||!env.SESSION_SECRET)return json({ok:false,error:"Admin secrets are not configured. Follow ADMIN_SETUP.md."},503);
   const ip=request.headers.get("CF-Connecting-IP")||"unknown";
   // A small per-isolate delay discourages brute-force attempts; edge rate limits should also be enabled.
   const p=await bodyJson(request);
   if(safeString(p.username,120)!==env.ADMIN_USERNAME||typeof p.password!=="string"||p.password.length>300||p.password!==env.ADMIN_PASSWORD){
     return json({ok:false,error:"Invalid username or password."},401,{"Set-Cookie":COOKIE+"=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0"});
   }
   const token=await issueSession(env);
   return json({ok:true},200,{"Set-Cookie":COOKIE+"="+token+"; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age="+SESSION_TTL_SECONDS});
 }
 if(path==="/api/admin/logout"&&method==="POST")return json({ok:true},200,{"Set-Cookie":COOKIE+"=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0"});
 if(path==="/api/admin/session"&&method==="GET")return json({authenticated:await isAdmin(request,env)});
 if(path==="/api/catalogue"&&method==="GET"){
   await requireDb(env);
   const products=await all(env.DB,"SELECT * FROM products WHERE published=1 ORDER BY featured DESC, sort_order ASC, updated_at DESC");
   const reviews=await all(env.DB,"SELECT * FROM reviews WHERE approved=1 ORDER BY featured DESC, sort_order ASC, created_at DESC");
   const content=await all(env.DB,"SELECT key,value FROM site_content");
   return json({products:products.map(publicProduct),reviews:reviews.map(publicReview),content:Object.fromEntries(content.map(x=>[x.key,JSON.parse(x.value)]))});
 }
 if(path.startsWith("/media/")&&method==="GET"){
   if(!env.IMAGES)return json({ok:false,error:"Image storage is not configured."},503);
   const key=decodeURIComponent(path.slice(7));
   if(!key||key.includes("..")||key.startsWith("/"))return json({ok:false,error:"Not found."},404);
   const object=await env.IMAGES.get(key); if(!object)return json({ok:false,error:"Not found."},404);
   const headers=new Headers(); object.writeHttpMetadata(headers); headers.set("Cache-Control","public, max-age=31536000, immutable"); headers.set("X-Content-Type-Options","nosniff");
   return new Response(object.body,{headers});
 }
 if(path==="/api/enquiries"&&method==="POST"){
   await requireDb(env);
   const p=await bodyJson(request);
   const name=safeString(p.name,100),phone=safeString(p.phone,40),email=safeString(p.email,180),interest=safeString(p.interest,120),details=safeString(p.details,3000),product=safeString(p.product,200);
   if(!name||phone.replace(/\D/g,"").length<7||!interest)return json({ok:false,error:"Please provide your name, valid phone number and enquiry type."},400);
   const id=crypto.randomUUID();
   await env.DB.prepare("INSERT INTO enquiries (id,name,phone,email,interest,details,product,page,source,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,'new',datetime('now'))").bind(id,name,phone,email,interest,details,product,safeString(p.page,160)||"/",safeString(p.source,120)||"website").run();
   return json({ok:true,id},201);
 }
 if(path.startsWith("/api/admin/")){
   if(!(await isAdmin(request,env)))return json({ok:false,error:"Authentication required."},401);
   await requireDb(env);
   if(path==="/api/admin/overview"&&method==="GET"){
     const counts=await env.DB.prepare("SELECT (SELECT COUNT(*) FROM products) products,(SELECT COUNT(*) FROM reviews) reviews,(SELECT COUNT(*) FROM enquiries WHERE status='new') new_enquiries,(SELECT COUNT(*) FROM enquiries) enquiries").first();
     return json({counts});
   }
   if(path==="/api/admin/products"){
     if(method==="GET")return json({items:(await all(env.DB,"SELECT * FROM products ORDER BY sort_order ASC,updated_at DESC")).map(publicProduct)});
     if(method==="POST"||method==="PUT"){
       const p=await bodyJson(request),id=safeString(p.id,100)||crypto.randomUUID(),name=safeString(p.name,160);
       if(!name)return json({ok:false,error:"Product name is required."},400);
       const images=Array.isArray(p.images)?p.images.map(x=>safeString(x,500)).filter(x=>x.startsWith("/media/")||/^https:\/\//i.test(x)).slice(0,12):[];
       const data=[id,slug(p.slug||name)||id,name,safeString(p.category,100)||"Living",safeString(p.description,3000),safeString(p.material,500),safeString(p.dimensions,500),JSON.stringify(images),p.featured?1:0,p.published?1:0,Math.max(-100000,Math.min(100000,Number(p.sort_order)||0))];
       await env.DB.prepare("INSERT INTO products (id,slug,name,category,description,material,dimensions,images,featured,published,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now'),datetime('now')) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug,name=excluded.name,category=excluded.category,description=excluded.description,material=excluded.material,dimensions=excluded.dimensions,images=excluded.images,featured=excluded.featured,published=excluded.published,sort_order=excluded.sort_order,updated_at=datetime('now')").bind(...data).run();
       return json({ok:true,id},method==="POST"?201:200);
     }
   }
   const productMatch=path.match(/^\/api\/admin\/products\/([^/]+)$/);
   if(productMatch&&method==="DELETE"){await env.DB.prepare("DELETE FROM products WHERE id=?").bind(decodeURIComponent(productMatch[1])).run();return json({ok:true});}
   if(path==="/api/admin/reviews"){
     if(method==="GET")return json({items:await all(env.DB,"SELECT * FROM reviews ORDER BY sort_order ASC,created_at DESC")});
     if(method==="POST"||method==="PUT"){
       const p=await bodyJson(request),id=safeString(p.id,100)||crypto.randomUUID(),name=safeString(p.customer_name,160),quote=safeString(p.review,3000);
       if(!name||!quote)return json({ok:false,error:"Customer name and review are required."},400);
       await env.DB.prepare("INSERT INTO reviews (id,customer_name,review,rating,photo_url,approved,featured,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,datetime('now'),datetime('now')) ON CONFLICT(id) DO UPDATE SET customer_name=excluded.customer_name,review=excluded.review,rating=excluded.rating,photo_url=excluded.photo_url,approved=excluded.approved,featured=excluded.featured,sort_order=excluded.sort_order,updated_at=datetime('now')").bind(id,name,quote,Math.max(1,Math.min(5,Number(p.rating)||5)),safeString(p.photo_url,500),p.approved?1:0,p.featured?1:0,Number(p.sort_order)||0).run();
       return json({ok:true,id},method==="POST"?201:200);
     }
   }
   const reviewMatch=path.match(/^\/api\/admin\/reviews\/([^/]+)$/);
   if(reviewMatch&&method==="DELETE"){await env.DB.prepare("DELETE FROM reviews WHERE id=?").bind(decodeURIComponent(reviewMatch[1])).run();return json({ok:true});}
   if(path==="/api/admin/content"){
     if(method==="GET")return json({items:Object.fromEntries((await all(env.DB,"SELECT key,value FROM site_content")).map(x=>[x.key,JSON.parse(x.value)]))});
     if(method==="PUT"){
       const p=await bodyJson(request); if(!p.items||typeof p.items!=="object"||Array.isArray(p.items))return json({ok:false,error:"Content must be an object."},400);
       for(const [key,value] of Object.entries(p.items)){if(!/^[a-z][a-z0-9_-]{0,79}$/.test(key))continue;const encoded=JSON.stringify(value);if(encoded.length>20000)continue;await env.DB.prepare("INSERT INTO site_content (key,value,updated_at) VALUES (?,?,datetime('now')) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=datetime('now')").bind(key,encoded).run();}
       return json({ok:true});
     }
   }
   if(path==="/api/admin/enquiries"){
     if(method==="GET")return json({items:await all(env.DB,"SELECT * FROM enquiries ORDER BY CASE status WHEN 'new' THEN 0 WHEN 'contacted' THEN 1 ELSE 2 END,created_at DESC LIMIT 500")});
     if(method==="PUT"){
       const p=await bodyJson(request);if(!["new","contacted","closed"].includes(p.status))return json({ok:false,error:"Invalid enquiry status."},400);
       await env.DB.prepare("UPDATE enquiries SET status=?,updated_at=datetime('now') WHERE id=?").bind(p.status,safeString(p.id,100)).run();return json({ok:true});
     }
   }
   if(path==="/api/admin/upload"&&method==="POST"){
     if(!env.IMAGES)return json({ok:false,error:"Cloudflare R2 binding IMAGES is not configured."},503);
     const form=await request.formData(),file=form.get("file");
     if(!(file instanceof File)||!file.size||file.size>8*1024*1024)return json({ok:false,error:"Choose an image up to 8 MB."},400);
     const types={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/avif":"avif"};
     if(!types[file.type])return json({ok:false,error:"Use JPG, PNG, WebP or AVIF."},415);
     const key="catalogue/"+crypto.randomUUID()+"."+types[file.type];
     await env.IMAGES.put(key,file.stream(),{httpMetadata:{contentType:file.type,cacheControl:"public, max-age=31536000, immutable"}});
     return json({ok:true,url:"/media/"+key,key},201);
   }
   return json({ok:false,error:"Not found."},404);
 }
 return null;
}
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(request.method==="OPTIONS")return new Response(null,{status:204,headers:{"Allow":"GET, POST, PUT, DELETE, OPTIONS"}});
 try {
   const result=await handle(request,env,url);
   if(result)return result;
   // All non-API requests are served from the existing static asset bundle.
   if(env.ASSETS)return env.ASSETS.fetch(request);
   return json({ok:false,error:"Not found."},404);
 } catch(e) {
   const msg=String(e&&e.message||e);
   if(msg==="Request too large")return json({ok:false,error:msg},413);
   console.error("Aakruti worker request failed",msg);
   return json({ok:false,error:"The request could not be completed. Check backend configuration and logs."},500);
 }
}};
