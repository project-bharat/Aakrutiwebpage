# Aakruti Website Visitor Analytics — Setup

The website code is committed, but analytics will remain inactive until you deploy the Apps Script and paste its Web App URL into `index.html`. The consent banner works independently. Visitors who reject analytics are not tracked.

## 1. Create the Google Sheet

1. Sign in to the Google account that should own the analytics.
2. Open https://sheets.new and name the spreadsheet **Aakruti Website Analytics**.
3. Copy the spreadsheet ID from its URL. It is the text between `/d/` and `/edit` in a URL like `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
4. Keep the sheet private to your team. Do not publish it to the web.

The Apps Script creates two tabs automatically when the first consented event arrives:
- **Visitor Events** — one row per event, with an anonymous visitor ID, time, page, device category, screen size, language, referrer hostname, campaign source, category and item interaction.
- **Daily Summary** — daily page views, unique anonymous visitors, repeat events, category views, product interactions, enquiry-button clicks, and top categories/referrers.

No name, email, phone number, exact location, age, gender, income, IP address or full referrer URL is intentionally collected by this feature. A click on an enquiry button is only an event count; it does not read the contact form fields.

## 2. Create the Apps Script endpoint

1. In the Sheet, open **Extensions → Apps Script**.
2. Replace the editor contents with the complete code from [Code.gs](./Code.gs) in this repository.
3. In the first few lines of Code.gs, replace `PASTE_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID from step 1. Keep the ID inside the quotes.
4. Click **Save** and name the project **Aakruti Website Analytics**.
5. Choose **Deploy → New deployment**.
6. Click the gear beside “Select type” and choose **Web app**.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone** so the public website can send events. This makes the endpoint public; the code only accepts a small allowlist of anonymous analytics events, but it is not an authenticated private API. Do not use this endpoint for contact details or sensitive data.
9. Click **Deploy**, review and approve Google's authorization prompts, then copy the Web app URL ending in `/exec`. Do not share editor access or credentials.

If your Google Workspace administrator does not allow “Anyone” access, deployment may be blocked; use an account/policy that supports a public web app or a managed analytics service instead.

## 3. Connect the website

1. Open `index.html` in this repository on GitHub and click Edit.
2. Find `PASTE_YOUR_DEPLOYED_APPS_SCRIPT_WEB_APP_URL_HERE`.
3. Replace only that placeholder with your deployed `https://script.google.com/macros/s/.../exec` URL, keeping the URL inside the existing single quotes.
4. Commit the change to `main`. GitHub Pages will redeploy the site.

The code intentionally sends nothing until the endpoint is configured and a visitor accepts optional analytics. It uses `no-cors`, so the browser cannot read the response; this is expected for this lightweight endpoint.

## 4. Test

1. Open the live website in a private/incognito window.
2. Click **Reject optional analytics**. Browse categories and products. No analytics rows should be added.
3. Clear that site's local storage or open a fresh private window, reload, and click **Accept analytics**.
4. Open a category such as Living or Bedroom and interact with a product. Check **Visitor Events** for `consent_granted`, `page_view`, `category_view`, or `product_interaction`.
5. Check **Daily Summary** for aggregated totals. A page reload after consent should add a page-view row.

## 5. Important limitations

- This is basic, consent-based usage analytics, not a full demographic profiling system. It cannot reliably determine a visitor's age, gender, income or identity, and does not try to infer those attributes.
- The anonymous browser ID is stored in local storage only after consent. Clearing site data or switching browsers can make the same person appear as a new visitor.
- The current setup records only `utm_source` as a campaign label and stores the referring hostname, not a full URL.
- Apps Script quotas and Google Sheets row limits apply. For high traffic, use a dedicated analytics platform or database.
- Provide an accurate privacy notice and review applicable privacy obligations for your business and audience. Do not use this dataset to make sensitive inferences.
