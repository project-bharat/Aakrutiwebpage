/**
 * Aakruti website analytics + enquiry receiver.
 * Configure SPREADSHEET_ID, then deploy as a Google Apps Script Web App.
 */
const SPREADSHEET_ID = ''; // Optional: set an existing spreadsheet ID. Leave blank to create a workbook automatically.
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
  const id = getSpreadsheetId_();
  return json_({service:'Aakruti website endpoint', status:id?'ready':'initializing', spreadsheetConfigured:!!id});
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ok:false,error:'empty_request'});
    const p = JSON.parse(e.postData.contents);
    const eventName = clean_(p.event, 60);
    if (eventName === 'enquiry_submit') return submitEnquiry_(p);
    const allowed = new Set(['page_view','consent_granted','category_view','product_interaction','product_view','add_to_cart','enquire_click']);
    if (!allowed.has(eventName)) return json_({ok:false,error:'event_not_allowed'});
    const visitorId = clean_(p.visitorId, 80);
    if (!/^[a-zA-Z0-9-]{8,80}$/.test(visitorId)) return json_({ok:false,error:'invalid_visitor_id'});
    const device = clean_(p.device, 12);
    const source = clean_(p.campaign, 100) || 'direct';
    const category = clean_(p.category, 80);
    const item = clean_(p.item, 100);
    const categoryProduct = [category, item].filter(Boolean).join(' / ').slice(0,180);
    const page = clean_(p.page, 120);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = getSpreadsheet_();
      const sheet = getSheet_(ss, EVENT_SHEET, EVENT_HEADERS);
      sheet.appendRow([new Date(), eventName, visitorId, page, device, source, safeCell_(categoryProduct)]);
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
  const product = clean_(p.product, 160);
  const page = clean_(p.page, 120);
  const source = clean_(p.source, 100) || 'website';
  if (!name || !phone || !interest || phone.replace(/\D/g,'').length < 7) {
    return json_({ok:false,error:'invalid_enquiry'});
  }

  // Attempt to save the enquiry, but do not let a spreadsheet problem suppress
  // the owner's email notification.
  let saved = false;
  let saveError = '';
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = getSpreadsheet_();
      const sheet = getSheet_(ss, ENQUIRY_SHEET, ENQUIRY_HEADERS);
      sheet.appendRow([new Date(), safeCell_(name), safeCell_(phone), safeCell_(email),
        safeCell_(interest), safeCell_(details), safeCell_(page), safeCell_(source)]);
      const eventSheet = getSheet_(ss, EVENT_SHEET, EVENT_HEADERS);
      const visitorId = clean_(p.visitorId, 80);
      eventSheet.appendRow([new Date(), 'enquiry_submit',
        /^[a-zA-Z0-9-]{8,80}$/.test(visitorId) ? visitorId : '',
        safeCell_(page), '', safeCell_(source),
        safeCell_([interest, product].filter(Boolean).join(' / '))]);
      refreshSummary_(ss, eventSheet);
      saved = true;
    } finally {
      lock.releaseLock();
    }
  } catch (sheetError) {
    saveError = String(sheetError).slice(0, 300);
    console.error('Enquiry email will still be attempted; spreadsheet save failed: ' + sheetError);
  }

  const subject = 'New website enquiry — Aakruti';
  const body = [
    'A new enquiry has been submitted through the Aakruti website.',
    '',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (email || 'Not provided'),
    'Enquiry: ' + interest,
    'Product: ' + (product || 'Not specified'),
    'Project details: ' + (details || 'Not provided'),
    'Page: ' + (page || 'Website'),
    'Traffic source: ' + source,
    '',
    'Spreadsheet saved: ' + (saved ? 'Yes' : 'No'),
    saved ? 'Open the Aakruti Website Analytics workbook and its Enquiries tab.' : 'Spreadsheet error: ' + saveError
  ].join('\n');
  try {
    const mail = {to: OWNER_EMAIL, subject: subject, body: body};
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) mail.replyTo = email;
    MailApp.sendEmail(mail);
  } catch (mailError) {
    console.error('Owner notification email failed: ' + mailError);
    return json_({ok:false, saved:saved, emailSent:false, emailError:String(mailError).slice(0,300), saveError:saveError});
  }
  return json_({ok:true, saved:saved, emailSent:true, saveError:saveError});
}

function getSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    const current = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0].map(String);
    if (current.join('¦') !== headers.join('¦')) {
      const oldValues = sheet.getDataRange().getValues();
      const oldHeaders = oldValues[0].map(String);
      const rows = oldValues.slice(1).map(oldRow => {
        const obj = {};
        oldHeaders.forEach((h,i) => obj[h] = oldRow[i]);
        if (name === EVENT_SHEET) {
          const time = obj['Event Time (UTC)'] || obj['Received At'] || new Date();
          return [
            time,
            obj['Event'] || '',
            obj['Anonymous Visitor ID'] || '',
            obj['Page Path'] || '',
            obj['Device'] || '',
            obj['Campaign Source'] || obj['Referrer Host'] || 'direct',
            obj['Furniture Category'] || obj['Product / Item'] || ''
          ];
        }
        return headers.map(h => obj[h] || '');
      });
      sheet.clearContents();
      sheet.getRange(1,1,1,headers.length).setValues([headers]);
      if (rows.length) sheet.getRange(2,1,rows.length,headers.length).setValues(rows);
    }
  }
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1,headers.length).setFontWeight('bold');
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
    const day=Utilities.formatDate(time, 'Asia/Kolkata', 'yyyy-MM-dd');
    if(!days[day]) days[day]={visitors:{},views:0,categories:0,products:0,enquiries:0,cats:{},sources:{}};
    const d=days[day], ev=String(r[1]||''), id=String(r[2]||'');
    if(id) d.visitors[id]=true;
    if(ev==='page_view') d.views++;
    if(ev==='category_view') d.categories++;
    if(['product_interaction','product_view','add_to_cart','enquire_click'].includes(ev)) d.products++;
    if(ev==='enquiry_submit') d.enquiries++;
    const cat=String(r[6]||''); if(cat && (ev==='category_view'||ev==='product_interaction'||ev==='product_view'||ev==='add_to_cart'||ev==='enquire_click')) d.cats[cat]=(d.cats[cat]||0)+1;
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

function getSpreadsheetId_() {
  const configured = String(SPREADSHEET_ID || '').trim();
  if (configured) return configured;
  return PropertiesService.getScriptProperties().getProperty('AAKRUTI_SPREADSHEET_ID') || '';
}
function getSpreadsheet_() {
  let id = getSpreadsheetId_();
  if (id) return SpreadsheetApp.openById(id);
  // First live request provisions the workbook and remembers it for future requests.
  const ss = SpreadsheetApp.create('Aakruti Website Analytics');
  PropertiesService.getScriptProperties().setProperty('AAKRUTI_SPREADSHEET_ID', ss.getId());
  try {
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: 'Aakruti website analytics sheet created',
      body: 'The website analytics workbook was created automatically. Open it here:\n' + ss.getUrl() + '\n\nVisitor Events, Daily Summary and Enquiries tabs will be created as events arrive.'
    });
  } catch (mailError) {
    console.error('Workbook created; notification email failed: ' + mailError);
  }
  return ss;
}
function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001F\u007F]/g,'').trim().slice(0,max);
}
function safeCell_(value) {
  const s=String(value == null ? '' : value);
  return /^[=+@-]/.test(s) ? "'" + s : s;
}
function validEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : OWNER_EMAIL;
}
function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
