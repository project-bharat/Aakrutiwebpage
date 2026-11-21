# Aakruti Enterprises Website

A responsive single-page furniture catalogue for Aakruti Enterprises, Hinjewadi, Pune.

## Before publishing
1. Open `index.html`.
2. Replace `919876543210` in `WHATSAPP_NUMBER` with the business WhatsApp number including country code 91.
3. Set `BUSINESS_EMAIL` to the business email address (optional).
4. Review the catalogue descriptions, service claims, and product photos before sharing publicly. Current catalogue photos are illustrative images hosted by Unsplash; they are not confirmed photographs of Aakruti products.

## Features
- Responsive charcoal and champagne-gold design
- Category-filtered product catalogue
- Interactive order tray with quantity controls
- Prepared WhatsApp and email inquiry messages
- Contact form that opens a prepared WhatsApp/email draft; it does not send messages or collect payments by itself

## GitHub Pages
In the repository settings, open **Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` deploys the root `index.html` site. After the first successful run, the published URL should be:

https://project-bharat.github.io/Aakrutiwebpage/

If the repository is private, confirm that the GitHub plan and repository settings support Pages publishing for a private repository.
