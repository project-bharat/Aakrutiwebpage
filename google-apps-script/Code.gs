/**
 * Aakruti visitor analytics endpoint.
 * Setup: create a Google Sheet, paste its ID below, then deploy as a web app.
 * This endpoint intentionally accepts only anonymous, allowlisted analytics fields.
 */
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const EVENT_SHEET = 'Visitor Events';
const SUMMARY_SHEET = 'Daily Summary';
const HEADERS = [
  'Received At', 'Event Time (UTC)', 'Anonymous Visitor ID', 'Event',
  'Page Path', 'Page Title', 'Referrer Host', 'Device',
  'Screen Size', 'Language', 'Campaign Source', 'Furniture Category', 'Product / Item'
];

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    service: 'Aakruti anonymous analytics',
    status: SPREADSHEET_ID.indexOf('PASTE_') === 0 ? 'setup_required' : 'ready'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ok:false, error:'empty_request'});
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('PASTE_') === 0) {
      return json_({ok:false, error:'spreadsheet_not_configured'});
    }
    const p = JSON.parse(e.postData.contents);
    const allowedEvents = new Set([
      'page_view', 'consent_granted', 'category_view',
      'product_interaction', 'enquiry_submit_click'
    ]);
    const eventName = clean_(p.event, 60);
    if (!allowedEvents.has(eventName)) return json_({ok:false, error:'event_not_allowed'});
    const visitorId = clean_(p.visitorId, 80);
    if (!/^([a-zA-Z0-9-]{8,80})$/.test(visitorId)) return json_({ok:false, error:'invalid_visitor_id'});

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = getOrCreateSheet_(ss, EVENT_SHEET, HEADERS);
      const row = [
        new Date(),
        clean_(p.occurredAt, 40),
        visitorId,
        eventName,
        clean_(p.page, 180),
        clean_(p.pageTitle, 140),
        clean_(p.referrerHost, 120),
        clean_(p.device, 20),
        clean_(p.screen, 20),
        clean_(p.language, 20),
        clean_(p.campaign, 100),
        clean_(p.category, 80),
        clean_(p.item, 100)
      ];
      sheet.appendRow(row);
      sheet.getRange(sheet.getLastRow(), 1, 1, row.length).setNumberFormat('@');
      sheet.getRange(sheet.getLastRow(), 1).setValue(new Date());
      refreshDailySummary_(ss, sheet);
    } finally {
      lock.releaseLock();
    }
    return json_({ok:true});
  } catch (err) {
    return json_({ok:false, error:'request_failed'});
  }
}

function getOrCreateSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function refreshDailySummary_(ss, events) {
  const summary = getOrCreateSheet_(ss, SUMMARY_SHEET, [
    'Date (UTC)', 'Page Views', 'Unique Anonymous Visitors',
    'Returning Visitor Events', 'Category Views', 'Product Interactions',
    'Enquiry Submit Clicks', 'Top Categories', 'Top Referrer Hosts'
  ]);
  const values = events.getDataRange().getValues();
  if (values.length < 2) return;
  const days = {};
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    const rawTime = r[1] instanceof Date ? r[1] : new Date(r[1] || r[0]);
    if (isNaN(rawTime.getTime())) continue;
    const day = Utilities.formatDate(rawTime, 'UTC', 'yyyy-MM-dd');
    if (!days[day]) days[day] = {views:0, visitors:{}, repeat:0, categories:0, products:0, enquiries:0, cats:{}, refs:{}};
    const d = days[day];
    const id = String(r[2] || '');
    if (id && d.visitors[id]) d.repeat++;
    if (id) d.visitors[id] = true;
    if (r[3] === 'page_view') d.views++;
    if (r[3] === 'category_view') { d.categories++; if (r[11]) d.cats[r[11]] = (d.cats[r[11]] || 0) + 1; }
    if (r[3] === 'product_interaction') d.products++;
    if (r[3] === 'enquiry_submit_click') d.enquiries++;
    if (r[6]) d.refs[r[6]] = (d.refs[r[6]] || 0) + 1;
  }
  summary.clearContents();
  summary.appendRow(['Date (UTC)', 'Page Views', 'Unique Anonymous Visitors', 'Returning Visitor Events', 'Category Views', 'Product Interactions', 'Enquiry Submit Clicks', 'Top Categories', 'Top Referrer Hosts']);
  Object.keys(days).sort().reverse().forEach(day => {
    const d = days[day];
    const top = obj => Object.keys(obj).sort((a,b)=>obj[b]-obj[a]).slice(0,5).map(k=>k+' ('+obj[k]+')').join(', ');
    summary.appendRow([day,d.views,Object.keys(d.visitors).length,d.repeat,d.categories,d.products,d.enquiries,top(d.cats),top(d.refs)]);
  });
  summary.setFrozenRows(1);
  summary.getRange(1,1,1,9).setFontWeight('bold');
}

function clean_(value, max) {
  return String(value == null ? '' : value)
    .replace(/[\\u0000-\\u001F\\u007F]/g, '')
    .replace(/^\s+|\s+$/g, '')
    .slice(0, max);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
