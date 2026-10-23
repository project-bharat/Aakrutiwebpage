# Aakruti Cloudflare Workers deployment

This repository keeps the existing static website unchanged while Cloudflare Workers serves the same HTML and public assets and handles the /api/analytics backend route.

## Architecture

- index.html, privacy.html, images, and other website assets are served as static assets by the aakrutiwebpage Worker.
- worker.js handles GET /api/analytics as a health check and POST /api/analytics as the server-side proxy for analytics and enquiry submissions.
- ANALYTICS_ENDPOINT must be configured as an encrypted Worker secret. Its Google Apps Script /exec URL must never be committed to the repository or placed in frontend code.
- .assetsignore excludes server source, migration documents, archives, and repository metadata from the public static asset upload.
- GitHub Pages remains independent and can stay enabled.

## Cloudflare setup

1. Open the existing Cloudflare Worker aakrutiwebpage, connected to project-bharat/Aakrutiwebpage.
2. Set the production branch to main. Keep the production deploy command as npx wrangler deploy.
3. The repository now includes wrangler.jsonc with the static-assets binding, /api/* Worker-first routing, and preview configuration. The site files are served from the repository root, while .assetsignore keeps backend source and internal docs out of the public asset bundle.
4. In Worker settings, add ANALYTICS_ENDPOINT as an encrypted secret. Use the existing Google Apps Script web-app /exec URL as the value. Never paste the URL into GitHub source files.
5. Deploy main, then test GET /api/analytics (expected JSON health response), an enquiry submission, and analytics after consent is granted.
6. For a client review without changing production, use the Worker preview deployment. The Wrangler configuration includes previews: {} to enable previews. Test the preview URL before sharing it.
7. Verify the visual site against GitHub Pages: desktop and mobile layout, navigation, product filters, cart, WhatsApp/email handoff, enquiry form, consent controls, and product gallery.

## Security and limitations

- The server-side proxy keeps the Apps Script endpoint URL out of browser HTML and JavaScript. It validates the destination host and limits request size.
- The frontend HTML, CSS, images, product data, and JavaScript required to render and operate the website are still public and inspectable in any browser. Hosting on Cloudflare cannot hide client-side code. Only backend logic and secrets executed on the Worker can be kept server-side.
- The public proxy is not an authentication system. Add Cloudflare rate limiting or Turnstile if abuse becomes an issue.
- Keep GitHub Pages enabled until the Cloudflare deployment and backend tests pass.
