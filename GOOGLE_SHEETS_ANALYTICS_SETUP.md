# Aakruti Website Analytics and Enquiries — Setup

## What the website collects

Optional analytics starts only after a visitor accepts it. Rejecting analytics still allows the visitor to submit an enquiry.

**Visitor Events** keeps only business-useful fields: timestamp, event, anonymous visitor ID (only for visitors who accepted analytics), page path, broad device category, traffic source, and category/product. It no longer intentionally collects screen size, browser language, page title, full referrer URL, IP address, age, gender, income, or precise location.

**Daily Summary** shows date (IST), unique anonymous visitors, page views, category views, product interactions, enquiry submissions, top categories/products, and traffic sources.

**Enquiries** stores submitted name, phone, optional email, enquiry type, project details, page and traffic source. The Apps Script emails each submission to **budgetbharatpro@gmail.com** with subject **New enquiry for Aakruti**.

## 1. Configure the Google Sheet

1. Open the Apps Script project connected to the deployed web-app endpoint.
2. Replace the editor's server code with the complete [Code.gs](./google-apps-script/Code.gs) from this repository and save it.
3. By default, the script creates a spreadsheet named **Aakruti Website Analytics** on the first incoming POST and emails its link to `budgetbharatpro@gmail.com`. The `Visitor Events`, `Daily Summary`, and `Enquiries` tabs are created automatically as data arrives.
4. If you want to use an existing spreadsheet instead, set `SPREADSHEET_ID` at the top of Code.gs to the ID from its URL (between `/d/` and `/edit`), then save.

The script migrates the old Visitor Events columns to the shorter business-focused layout the next time an event arrives. Old screen-size/language columns are removed during this migration. Daily Summary is rebuilt in the new concise format. A new Enquiries tab is created when the first form is submitted.

## 2. Redeploy the existing Web App

Because the website already uses a deployed Apps Script URL, keep that deployment URL:

1. In Apps Script, click **Deploy → Manage deployments**.
2. Select the existing Web app deployment and click Edit (pencil).
3. Under Version, choose **New version**.
4. Click **Deploy** and complete any authorization prompts.
5. Confirm that access remains **Anyone** if the website is to submit directly. If your Google account or Workspace policy disallows this, use a supported deployment/account rather than exposing another endpoint.

The script runs as the deploying account. Google may ask for spreadsheet and email permissions so it can write rows and send notification emails. The spreadsheet itself should remain private to your team.

## 3. Website changes already committed

- Removed the external WoodenStreet product link/button.
- Added **Submit Enquiry**, alongside **WhatsApp** and **Mail**, to the Request a callback / quote form.
- WhatsApp opens **+91 72188 38122**.
- Mail opens a draft addressed to **budgetbharatpro@gmail.com**.
- Submit Enquiry posts the filled form to the Apps Script endpoint, saves it in Enquiries and emails the owner.
- Enquiry submissions are recorded as `enquiry_submit` events and counted in Daily Summary.

## 4. Test

1. Deploy the updated Apps Script as described above.
2. Open the live website and submit a test enquiry with your own test details.
3. Check the **Enquiries** tab and the owner inbox at budgetbharatpro@gmail.com. If a new workbook was created, open the link in the setup notification email.
4. Check **Visitor Events** for `enquiry_submit` and the combined `Category / Product` values; **Daily Summary → Enquiry Submissions** should increment.
5. Accept optional analytics consent, then view a product, click Add to Cart, and click Enquire. Check for `product_view`, `add_to_cart`, and `enquire_click` rows.
6. Test WhatsApp and Mail separately.

The browser uses a lightweight cross-origin request mode, so it cannot display a definitive server response. Verify the first test in the sheet and inbox before relying on live submissions. Apps Script quotas apply. As the endpoint is public, the script includes basic input limits and a honeypot but is not an authenticated anti-spam service; review submissions periodically.

The website does not infer personal demographics. The enquiry form collects only the details visitors choose to submit for a business response. Review the privacy notice and your applicable data-retention/privacy obligations.
