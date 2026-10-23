# Aakruti owner admin setup

This feature is intentionally deployed by pull request first. Do not merge into production until the Cloudflare resources and secrets below are configured. The existing public site and GitHub Pages workflow are retained.

## What is included
- `/admin.html`: owner-only login and dashboard.
- Worker API: signed, eight-hour HttpOnly session cookie; product/review/content/enquiry CRUD; R2 image upload.
- D1 migration: products, reviews, homepage content and enquiries.
- Public read endpoint: `GET /api/catalogue`; enquiry endpoint: `POST /api/enquiries`.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `SESSION_SECRET` must be Cloudflare Worker secrets, never source code.

## Cloudflare one-time setup
1. In Cloudflare, open **Workers & Pages → D1 SQL Database → Create database**. Name it `aakruti-content`. Copy the database ID.
2. Open **R2 Object Storage → Create bucket**. Name it `aakruti-images`.
3. Replace `REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID` in `wrangler.jsonc` with the D1 database ID.
4. Add Worker secrets under **Settings → Variables and Secrets**:
   - `ADMIN_USERNAME`: choose a unique owner login name.
   - `ADMIN_PASSWORD`: choose a strong, unique password (at least 16 characters). Do not reuse email or social account passwords.
   - `SESSION_SECRET`: a random secret with at least 32 random bytes. Generate one locally with `openssl rand -base64 48`; paste it as an encrypted secret.
   - Preserve the existing encrypted `ANALYTICS_ENDPOINT` secret.
5. Ensure the production build command is blank and deploy command is `npx wrangler deploy`. The Worker needs the D1/R2 resources above.
6. Apply the migration from a trusted local terminal after installing Wrangler and logging in:
   `npx wrangler d1 migrations apply aakruti-content --remote`
   The Wrangler configuration must contain the actual D1 ID first.
7. Deploy to a preview branch first. Verify admin login, product create/edit/delete, review approval, upload, enquiry status, and public catalogue. Only then merge/deploy to production.

## Current scope and important notes
- Existing product catalogue is currently illustrative demo content. Do not present the current Unsplash furniture imagery as verified Aakruti stock. Add verified product information and licensed photographs before publishing.
- D1/R2 resources and secrets cannot be created by a GitHub code commit. Someone with Cloudflare account access must create them and apply the migration.
- The homepage editor stores fields in D1. Public-page content wiring must be enabled in the site's public integration code before expecting edits to change the homepage.
- The existing Google Apps Script analytics/enquiry integration remains in the repo. This admin API adds D1 enquiry storage; avoid switching the live enquiry form until the API has been tested and owner has confirmed notification handling.
- Add Cloudflare rate limiting on `/api/admin/login` before public launch. For a stronger production deployment, use Cloudflare Turnstile on login and enquiry forms.
