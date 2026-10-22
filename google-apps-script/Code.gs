/**
 * Aakruti website analytics + enquiry receiver.
 * Configure SPREADSHEET_ID, then deploy as a Google Apps Script Web App.
 */
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const OWNER_EMAIL = 'budgetbharatpro@gmail.com';
const EVENT_SHEET = 'Visitor Events';
const SUMMARY_SHEET = 'Daily Summary';
const ENQUIRY_SHEET = 'Enquiries';
const EVENT_HEADERS = [
  'Timestamp (IST)', 'Event', 'Anonymous Visitor ID', 'Page',
  'Device', 'Traffic Source', 'Category / Product'
];
const ENQUIRY_HEADERS = [
  'Submitted At (IST)', 'Name', 'Phone', 'Email',
  'Enquiry Type', 'Project Details', 'Page', 'Traffic Source'
];

function doGet() {
  return json_({service:'Aakruti website endpoint', status:isConfigured_()?'ready':'setup_required'});
}

function doPost(e) {
  try {
    if (!isConfigured_()) return json_({ok:false,error:'spreadsheet_not_configured'});
    if (!e || !e.postData || !e.postData.contents) return json_({ok:false,error:'empty_request'});
    const p = JSON.parse(e.postData.contents);
    const eventName = clean_(p.event, 60);
    if (eventName === 'enquiry_submit') return submitEnquiry_(p);
    const allowed = new Set(['page_view','consent_granted','category_view','product_interaction']);
    if (!allowed.has(eventName)) return json_({ok:false,error:'event_not_allowed'});
    const visitorId = clean_(p.visitorId, 80);
    if (!/^[a-zA-Z0-9-]{8,80}$/.test(visitorId)) return json_({ok:false,error:'invalid_visitor_id'});
    const device = clean_(p.device, 12);
    const source = clean_(p.campaign, 100) || 'direct';
    const category = clean_(p.category, 80);
    const item = clean_(p.item, 100);
    const page = clean_(p.page, 120);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = getSheet_(ss, EVENT_SHEET, EVENT_HEADERS);
      sheet.appendRow([new Date(), eventName, visitorId, page, device, source, category || item]);
      refreshSummary_(ss, sheet);
    } finally { lock.releaseLock(); }
    return json_({ok:true});
  } catch (err) {
    console.error(err);
    return json_({ok:false,error:'request_failed'});
  }
}

function submitEnquiry_(p) {
  // Honeypot for basic bot filtering; do not store its contents.
  if (clean_(p.website, 200)) return json_({ok:true});
  const name = clean_(p.name, 100);
  const phone = clean_(p.phone, 30);
  const email = clean_(p.email, 160);
  const interest = clean_(p.interest, 100);
  const details = clean_(p.details, 2000);
  const page = clean_(p.page, 120);
  const source = clean_(p.source, 100) || 'website';
  if (!name || !phone || !interest || phone.replace(/\\D/g,'').length < 7) {
    return json_({ok:false,error:'invalid_enquiry'});
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getSheet_(ss, ENQUIRY_SHEET, ENQUIRY_HEADERS);
    sheet.appendRow([new Date(), safeCell_(name), safeCell_(phone), safeCell_(email),
      safeCell_(interest), safeCell_(details), safeCell_(page), safeCell_(source)]);
    const eventSheet = getSheet_(ss, EVENT_SHEET, EVENT_HEADERS);
    const visitorId = clean_(p.visitorId, 80);
    eventSheet.appendRow([new Date(), 'enquiry_submit',
      /^[a-zA-Z0-9-]{8,80}$/.test(visitorId) ? visitorId : '',
      safeCell_(page), '', safeCell_(source), safeCell_(interest)]);
    refreshSummary_(ss, eventSheet);
  } finally { lock.releaseLock(); }

  const subject = 'New enquiry for Aakruti';
  const body = [
    'A new enquiry has been submitted through the Aakruti website.',
    '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (email || 'Not provided'),
    'Enquiry: ' + interest,
    'Project details: ' + (details || 'Not provided'),
    'Page: ' + (page || 'Website'),
    'Traffic source: ' + source,
    '',
    'This enquiry is also saved in the Enquiries tab of Aakruti Website Analytics.'
  ].join('\\n');
  MailApp.sendEmail({to:OWNER_EMAIL, subject:subject, body:body, replyTo:validEmail_(email)});
  return json_({ok:true});
}

function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,headers.length).setFontWeight('bold');
  }
  return sheet;
}

function refreshSummary_(ss, events) {
  const headers = [
    'Date (IST)', 'Unique Visitors', 'Page Views', 'Category Views',
    'Product Interactions', 'Enquiry Submissions', 'Top Categories / Products', 'Traffic Sources'
  ];
  const summary = getSheet_(ss, SUMMARY_SHEET, headers);
  const values = events.getDataRange().getValues();
  const days = {};
  for (let i=1;i<values.length;i++) {
    const r=values[i];
    const time=r[0] instanceof Date ? r[0] : new Date(r[0]);
    if (isNaN(time.getTime())) continue;
    const day=Utilities.formatDate(time, Session.getScriptTimeZone() || 'Asia/Kolkata', 'yyyy-MM-dd');
    if(!days[day]) days[day]={visitors:{},views:0,categories:0,products:0,enquiries:0,cats:{},sources:{}};
    const d=days[day], ev=String(r[1]||''), id=String(r[2]||'');
    if(id) d.visitors[id]=true;
    if(ev==='page_view') d.views++;
    if(ev==='category_view') d.categories++;
    if(ev==='product_interaction') d.products++;
    if(ev==='enquiry_submit') d.enquiries++;
    const cat=String(r[6]||''); if(cat && (ev==='category_view'||ev==='product_interaction')) d.cats[cat]=(d.cats[cat]||0)+1;
    const source=String(r[5]||''); if(source) d.sources[source]=(d.sources[source]||0)+1;
  }
  summary.clearContents();
  summary.appendRow(headers);
  Object.keys(days).sort().reverse().forEach(day=>{
    const d=days[day], top=o=>Object.keys(o).sort((a,b)=>o[b]-o[a]).slice(0,4).map(k=>k+' ('+o[k]+')').join(', ');
    summary.appendRow([day,Object.keys(d.visitors).length,d.views,d.categories,d.products,d.enquiries,top(d.cats),top(d.sources)]);
  });
  summary.setFrozenRows(1);
  summary.getRange(1,1,1,headers.length).setFontWeight('bold');
}

function isConfigured_() {
  return !!SPREADSHEET_ID && SPREADSHEET_ID.indexOf('PASTE_') !== 0;
}
function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[\\u0000-\\u001F\\u007F]/g,'').trim().slice(0,max);
}
function safeCell_(value) {
  const s=String(value == null ? '' : value);
  return /^[=+@\\-]/.test(s) ? "'" + s : s;
}
function validEmail_(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) ? email : OWNER_EMAIL;
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
