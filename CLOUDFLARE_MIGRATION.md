# Aakruti Cloudflare migration

This branch prepares the website for Cloudflare Pages with a Pages Function acting as the server-side proxy for analytics and enquiry submissions.

## What changed

- The browser no longer contains the Google Apps Script endpoint URL.
- Both analytics events and the contact-form submission post to the same-origin path `/api/analytics`.
- `functions/api/analytics.js` forwards POST bodies to a configured Google Apps Script web-app endpoint.
- The current GitHub Pages site and `main` branch are unchanged.

## Cloudflare setup

1. In Cloudflare Dashboard, open **Workers & Pages → Create application → Pages → Connect to Git**.
2. Connect `project-bharat/Aakrutiwebpage` and choose `feat/cloudflare-pages-workers-migration` for a preview deployment first. This is a static HTML site; leave the build command empty and set the build output directory to `/` if prompted. If Cloudflare requires a build output folder, use a folder containing the root `index.html`; do not use the repository root as a framework build output without checking the build log.
3. In the Pages project, open **Settings → Variables and Secrets** (or **Settings → Functions → Environment variables**, depending on dashboard layout) and add `ANALYTICS_ENDPOINT` as an encrypted secret. Set its value to the existing Google Apps Script web-app `/exec` URL. Do not put that URL in source code or commit it as a repository variable.
4. Redeploy the preview after adding the secret.
5. Verify `/api/analytics` returns a health response, submit a test enquiry, and confirm the existing Apps Script receives it. Check analytics only after accepting the site's analytics consent.
6. Test product filters, cart, WhatsApp/email handoff, contact form, cookie consent, mobile navigation, and product gallery.
7. Only after those checks pass, choose a production branch and configure the final public URL/custom domain. Update canonical and social metadata to the final URL before switching production.

## Important limitations

- A Cloudflare account and its GitHub authorization are required to create and deploy the Pages project. This repository change does not itself deploy the site.
- The function protects the Apps Script endpoint from being exposed in browser code, but it is not an authentication system. Add rate limiting or Turnstile if the public endpoint is abused.
- WhatsApp number, business email, product catalogue, HTML, CSS, and frontend JavaScript are public by design and remain visible to visitors.
- Keep the existing GitHub Pages deployment enabled until Cloudflare preview and production are verified.
