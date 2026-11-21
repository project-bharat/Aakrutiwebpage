# Aakruti Enterprises — SEO & Webpage Content Improvement Plan

Prepared 31 Oct 2026 · Site: https://project-bharat.github.io/Aakrutiwebpage/ · Reviewed file: `index__4_.html`

**How to use this file:** Part 1 is the plan for the owner/marketer. Part 2 is a ready-to-paste instruction set for ChatGPT (or any AI) that edits the HTML. Paste Part 2 together with the HTML file.

---

# PART 1 — THE PLAN

## 1. Confirmed facts (use these, nothing else)

| Item | Value | Status |
|---|---|---|
| Business | Aakruti Enterprises, furniture manufacturer | Confirmed |
| Established | 1992 (Ajay Singh Chauhan, Ganesh Nirgun) | Confirmed |
| Furniture manufacturing since | 2008 | Confirmed |
| Model | Made-to-order, own manufacturing unit | Confirmed |
| Phone / WhatsApp | +91 83087 64140 (tel:+918308764140, wa.me/918308764140) | Confirmed by owner |
| Location | Hinjewadi, Pune 411057. Map pin: 18.5835783, 73.7451264 | Pin supplied. Street line needs one final match (see below) |
| Hours | Mon–Sat 9:00 AM–5:30 PM, Sunday closed. Appointment preferred | Confirmed |
| Lead time | Approx. 3–4 weeks, confirmed with quotation | Estimate only |
| Categories | Beds & Wardrobes · Coffee & Centre Tables · Side Tables · TV Units · Study & Office · Outdoor · Custom | Confirmed |
| Not offered / unconfirmed | Sofas, dining, decor, modular kitchens, complete interiors | Do not advertise |

**Address to confirm before publishing:** the questionnaire says "Hulavale Vasti, Hinjewadi, Tal. Mulshi, Dist. Pune 411057"; the Maps text says "Sakhare Vasti Rd, Phase 1, Rajiv Gandhi Infotech Park, Hinjawadi 411057". Use one line identically on the website, Google Business Profile and every directory.

**Open owner questions:** official email · warranty terms (the site currently publishes 5/10 years; the brief says not to until confirmed) · solid wood and cushion-work exclusions · whether sofas/dining are offered · real photos · social links · public name/designation.

## 2. Audit findings (live site, crawled 31 Oct 2026)

| Priority | Finding | Fix |
|---|---|---|
| Critical | Home page has no `<title>` | Add title (Part 2, task 1) |
| High | Meta description is 266 characters | Shorten to ≤155 |
| High | `<meta name="keywords">` lists luxury, interiors, sofa, dining, "high end furniture India" | Delete the tag. Google ignores it and it contradicts the brand |
| High | JSON-LD has no phone, street address, geo, hours; `knowsAbout` lists luxury, dining, interior solutions; image is an Unsplash stock photo | Replace with full LocalBusiness schema |
| High | Site lives at `github.io/Aakrutiwebpage/`. A project subpath cannot serve its own `/robots.txt`, and the domain has no authority | Buy and connect a custom domain (see 5.1) |
| High | No sitemap.xml; only 2 URLs (home, privacy) | Add sitemap now, add real pages next |
| Medium | 13 Unsplash images, including OG/Twitter image, presented as references | Replace with real Aakruti photos; label any temporary image "illustrative" |
| Medium | A "Dining room reference" story, "Explore dining furniture" link, "Luxury interior" stat, "100+ designs", Bangalore testimonial (unverified) | Remove or replace (task 6) |
| Medium | H1 is only "Spaces shaped around your [word]": no keyword | Keep H1 (owner-approved) and add keyword-bearing eyebrow + intro (task 3) |
| Medium | Single-page hash navigation: one indexable page for every topic | Build separate pages per category (Phase 2) |
| Low | Warranty 5/10-year figures published in FAQ | Replace with interim wording until confirmed |
| Positive | 200 OK, ~5 ms response, indexable, canonical, OG/Twitter tags, alt text on all images, FAQ section, 1,784 words, privacy page | Keep |

## 3. Keyword strategy

Search data for Pune is thin and mostly national, so the strategy is **local intent plus product + "manufacturer"**, not volume chasing. Volumes below are India-wide where measured; "est." means not measured.

| Keyword | Measured demand | Use on |
|---|---|---|
| furniture manufacturer in pune | cluster demand present, local pack dominated | Home title, H2, intro, GBP |
| custom furniture pune | ~50/mo, KD 47 | Custom Furniture page |
| made to order furniture pune | low | Home, Custom page |
| furniture in pune | ~880/mo | Home supporting copy |
| wooden furniture manufacturers | ~480/mo | Materials copy (only once material facts confirmed) |
| furniture manufacturers in india | ~480/mo | Not a target; avoid "All India" claims |
| office furniture manufacturer pune | est. low, strong competitors | Study & Office page |
| wardrobe manufacturer pune / bed manufacturer pune | est. low | Beds & Wardrobes page |
| TV unit manufacturer pune | est. low | TV Units page |
| outdoor furniture pune | est. low | Outdoor page |
| furniture manufacturer hinjewadi / wakad / baner / pcmc | est. low, high local intent | Contact/area text, GBP, FAQs |
| furniture for architects / interior designers pune | est. low | Professionals section/page |

**Do not target:** sofa, dining, modular kitchen, interior design, luxury interiors.

**Competitors seen:** Pixel Furniture, Woodpecker Furniture Studio, Jagdamba, Crystal Furnitech, Hasan's Studio, Ra Lifestyles, Swidoo Interics, Monarch Ergo (since 1996), Sitoro, Livinstyles, Cane India, Vlite Furnitech, and nearby on Maps: Star Furniture Manufacturers (4.9★/101), Rightwood (4.5★/286), Sri Furniture Village (4.8★/256), Mauli Furniture and Interior, PU Enterprises. IndiaMART, Justdial, Facebook and YouTube also surface.

**Differentiator to lean on:** "Established 1992 · manufacturing since 2008 · own manufacturing unit · made to your dimensions". Most competitors are dealers or sofa/modular specialists.

## 4. On-page plan (page by page)

**Phase 1: existing single page (this week)**
- Title, meta description, OG/Twitter, canonical (keep), robots meta (keep).
- Replace JSON-LD; add FAQPage JSON-LD matching visible FAQs.
- Add keyword-bearing eyebrow and intro under the H1.
- Clean claims (luxury, dining, 100+ designs, sofa, interiors).
- Replace stock OG image; add `width`/`height` on images; keep lazy loading below the fold.
- Add visible NAP block (name, address, phone, hours) in footer and contact section.
- Add `sitemap.xml`, `robots.txt` (effective once on a custom domain).

**Phase 2: separate pages (weeks 3–8).** Each ≥400 words, own title/H1/meta, real photos, enquiry button, FAQ, link back to home and to the other categories:

1. `/beds-and-wardrobes/` — "Beds & Wardrobe Manufacturer in Pune"
2. `/tv-units/` — "Made-to-Order TV Units in Pune"
3. `/coffee-and-centre-tables/`
4. `/side-tables/`
5. `/study-and-office-furniture/` — "Office & Study Furniture Manufacturer in Pune"
6. `/outdoor-furniture/`
7. `/custom-furniture/` — "Custom Furniture Pune: Your Dimensions, Finish, Reference"
8. `/manufacturing-unit/` — facility, machinery, team (real photos)
9. `/for-architects-and-designers/` — trade/project enquiries
10. `/about/` — 1992 / 2008 story
11. `/projects/` — only genuine, permission-cleared projects
12. `/contact/` — NAP, map embed, form, WhatsApp

## 5. Off-page and local SEO

### 5.1 Domain
Register a domain (e.g. aakrutienterprises.com or .in, availability to check), point it to the site, set 301 redirects from the github.io URL, update canonical, sitemap and schema. Add the site to Google Search Console and Bing Webmaster Tools.

### 5.2 Google Business Profile (highest-impact task)
- Open the supplied map pin and claim/verify the profile. Name exactly **Aakruti Enterprises** (no keyword stuffing).
- Primary category: **Furniture manufacturer**. Secondary options: Custom furniture store (only if accurate), Office furniture store (only if accurate).
- Phone +91 83087 64140; website URL; hours Mon–Sat 9:00–17:30; Sunday closed; "Appointments" link to WhatsApp.
- Description (≤750 chars): see 5.5.
- Services: Made-to-order furniture, custom furniture, beds and wardrobes, TV units, tables, study and office furniture, outdoor furniture, site measurement, delivery (as applicable), after-sales support.
- Photos: logo, exterior, manufacturing floor, team, products from multiple angles, finished work. Minimum 20 real photos in month 1, then 4+ per month.
- Posts: 1 per week (new piece, process shot, project).
- Reviews: ask every completed customer; target 25 genuine reviews in 90 days; reply to all. Never buy or fabricate reviews.

### 5.3 Citations (identical name, address, phone everywhere)
Justdial, IndiaMART, Sulekha, TradeIndia, ExportersIndia, Bing Places, Apple Business Connect, Facebook page, Instagram, LinkedIn page, YouTube channel, Pinterest. Record each login in one sheet.

### 5.4 Backlinks (currently 0)
1. Citations above (quick, safe).
2. Architects and interior designers in Pune: supplier listing on their sites, or a project credit with link ("Furniture by Aakruti Enterprises").
3. Builder and developer partners in Hinjewadi, Wakad, Baner, PCMC.
4. Hinjewadi/Pune business associations, IT-park and housing-society directories.
5. Local press or blogs: "furniture manufacturing unit in Hinjewadi since 2008" story.
6. Supplier/material partners that list their dealers.
Avoid paid link packages, comment spam and directory farms (competitors' profiles show spam-score 57 links).

### 5.5 Copy bank

**GBP description (about 600 chars):**
"Aakruti Enterprises is a furniture manufacturer in Hinjewadi, Pune. Our business was established in 1992 and we have manufactured furniture since 2008 in our own manufacturing unit. We make made-to-order beds, wardrobes, coffee and centre tables, side tables, TV units, study and office furniture, outdoor furniture and custom furniture to your dimensions, colours and finishes. Share a reference image or your requirement and we will discuss feasibility, quotation and an estimated timeline. Typical lead time is approximately 3–4 weeks. Appointment preferred. Open Monday to Saturday, 9:00 AM–5:30 PM."

**Short bio (Instagram/Facebook, ≤150):**
"Furniture manufacturer, Pune. Made to order in our own unit. Business since 1992 · Making furniture since 2008."

## 6. Content plan (SEO + social)

Monthly minimum: 2 GBP posts per week · 4 product posts · 4 manufacturing reels · 2 project showcases · 2 educational posts ("How to measure for a wardrobe", "What to share for a custom TV unit") · 1 blog/guide page.

First 10 helpful pages/posts:
1. How made-to-order furniture works (dimensions → quotation → production)
2. How to prepare measurements for a custom wardrobe
3. Questions to ask a furniture manufacturer in Pune
4. Custom TV unit: what details we need
5. Bed size and storage options for Indian bedrooms
6. Outdoor furniture care basics (only generic, non-warranty claims)
7. Working with architects and interior designers: our process
8. Inside our manufacturing unit (photo story)
9. From enquiry to installation: timeline explained
10. Furniture for home offices in Hinjewadi and Wakad

## 7. 90-day schedule

| Days | Focus |
|---|---|
| 1–7 | Title/meta/schema/sitemap fixes · GBP claim · confirm address, email, warranty, exclusions |
| 8–30 | Real photo shoot · replace stock images · citations · domain + redirects · Search Console |
| 31–60 | Category pages 1–6 · GBP weekly posts · first 10 reviews · architect outreach |
| 61–90 | Pages 7–12 · 25 reviews target · 2 blog posts · local ads test · review rankings and enquiries |

## 8. Tracking

- Search Console: impressions, clicks, queries (Pune/Hinjewadi terms).
- GBP Insights: calls, direction requests, website clicks.
- Enquiries per source: tag WhatsApp and form links (e.g. `?utm_source=gbp&utm_medium=profile`).
- Rank tracker (manual to start): "furniture manufacturer in pune", "custom furniture pune", "furniture manufacturer hinjewadi", "wardrobe manufacturer pune", "tv unit manufacturer pune".
- Monthly: enquiry count, qualified enquiries, review count, ranking for 5 keywords.

---

# PART 2 — INSTRUCTIONS FOR CHATGPT (HTML EDITOR)

> **Paste everything below this line into ChatGPT, then attach or paste `index.html`.**

---

## ROLE
You are editing the existing single-file website `index.html` for **Aakruti Enterprises**, a furniture manufacturer in Hinjewadi, Pune. Make the edits listed below. This is a content and SEO edit. **Do not redesign the page, change the layout, rename CSS classes, remove JavaScript behaviour (catalogue filters, enquiry tray, analytics consent), or change the brand colours.**

## SOURCE OF TRUTH (use only these facts)
- Business: Aakruti Enterprises, **furniture manufacturer**. Established **1992**; furniture manufacturing since **2008**. Founders: Ajay Singh Chauhan and Ganesh Nirgun. Owner/contact: Rushikesh Chauhan.
- Own manufacturing unit, trained staff, made to order. Customers can discuss dimensions, colours, finishes and share reference images, subject to feasibility.
- Location: Hinjewadi, Pune, Maharashtra 411057. Coordinates: lat **18.5835783**, lng **73.7451264**.
- Phone and WhatsApp: **+91 83087 64140** → `tel:+918308764140`, `https://wa.me/918308764140`.
- Hours: Monday–Saturday 9:00 AM–5:30 PM; Sunday closed. Appointment preferred.
- Categories (only these): Beds & Wardrobes; Coffee & Centre Tables; Side Tables; TV Units; Study & Office Furniture; Outdoor Furniture; Custom Furniture.
- Typical lead time: "approximately 3–4 weeks; final timeline is confirmed with the quotation".
- Consultation and delivery are generally free within Pune, PCMC and nearby areas; other locations depend on travel/transport charges.

## HARD RULES
1. **Never add or keep claims about:** sofas, dining furniture, decor, modular kitchens, "complete home interiors", "interior solutions", "interior design", "luxury interiors", "one-stop", "all India", "best", "No. 1", "unmatched", "certified", "waterproof", "termite-proof", brand-name hardware, sustainability.
2. **Do not invent** prices, projects, customers, testimonials, ratings, review counts, awards, certifications, materials, product specs or years beyond 1992 and 2008.
3. Do not state that furniture manufacturing began in 1992. Established 1992; manufacturing since 2008.
4. Do not publish specific warranty periods. Use: "Warranty support is available. Terms and coverage are confirmed with the order."
5. Do not add `aggregateRating`, `review` or `offers`/prices to schema.
6. Never present stock or reference photos as Aakruti work. If any remain, label them "Illustrative image".
7. Do not hide text for SEO. Do not keyword-stuff. Use plain, natural English.
8. Use straight copy-paste values below. If a value says `[CONFIRM]`, leave it exactly as written and list it in your final report.
9. Keep all existing `id` attributes, anchor links and form/WhatsApp behaviour working.

## TASKS (do in this order)

### TASK 1: `<head>` tags
a) **Add** (there is currently no title):
```html
<title>Made-to-Order Furniture Manufacturer Pune | Aakruti</title>
```
b) **Replace** the meta description with:
```html
<meta name="description" content="Made-to-order furniture manufacturer in Hinjewadi, Pune. Beds, wardrobes, TV units, tables and custom furniture. Business since 1992; making since 2008.">
```
c) **Delete** the entire `<meta name="keywords" ...>` tag.
d) Keep `canonical`, `robots`, `viewport`. Keep geo meta tags only if they read: region `IN-MH`, placename `Hinjewadi, Pune, Maharashtra, India`; add `<meta name="geo.position" content="18.5835783;73.7451264">` and `<meta name="ICBM" content="18.5835783, 73.7451264">`.
e) **Open Graph / Twitter:** set
   - `og:title` and `twitter:title`: `Aakruti Enterprises | Made-to-Order Furniture Manufacturer in Pune`
   - `og:description` and `twitter:description`: `Furniture manufacturer in Hinjewadi, Pune. Made to your dimensions, colours and finishes. Business since 1992; manufacturing since 2008.`
   - `og:image` and `twitter:image`: leave the current URL but add an HTML comment above it: `<!-- TODO: replace with real Aakruti photo, 1200x630 -->`
   - Add `<meta property="og:locale" content="en_IN">` if missing, `og:url` = canonical URL.
f) Add `<meta name="theme-color" content="#525266">`.

### TASK 2: Replace the JSON-LD
Replace the existing `<script type="application/ld+json">` block with this (keep `https://project-bharat.github.io/Aakrutiwebpage/` as the URL until a custom domain exists; then update every URL):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FurnitureStore"],
  "@id": "https://project-bharat.github.io/Aakrutiwebpage/#business",
  "name": "Aakruti Enterprises",
  "alternateName": "Aakruti Enterprises Furniture Manufacturing",
  "url": "https://project-bharat.github.io/Aakrutiwebpage/",
  "description": "Made-to-order furniture manufacturer in Hinjewadi, Pune. Business established in 1992; furniture manufacturing since 2008. Beds, wardrobes, tables, TV units, study and office furniture, outdoor furniture and custom furniture.",
  "foundingDate": "1992",
  "founder": [
    {"@type": "Person", "name": "Ajay Singh Chauhan"},
    {"@type": "Person", "name": "Ganesh Nirgun"}
  ],
  "telephone": "+918308764140",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hulavale Vasti, Hinjewadi, Tal. Mulshi",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411057",
    "addressCountry": "IN"
  },
  "geo": {"@type": "GeoCoordinates", "latitude": 18.5835783, "longitude": 73.7451264},
  "hasMap": "https://maps.app.goo.gl/cL5JcCFjrB4NHpUx8",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "17:30"
  }],
  "areaServed": [
    {"@type": "City", "name": "Pune"},
    {"@type": "City", "name": "Pimpri-Chinchwad"},
    {"@type": "Place", "name": "Hinjewadi"},
    {"@type": "Place", "name": "Wakad"},
    {"@type": "Place", "name": "Baner"},
    {"@type": "Place", "name": "Balewadi"}
  ],
  "knowsAbout": ["Made-to-order furniture", "Custom furniture", "Beds and wardrobes", "TV units", "Coffee and centre tables", "Side tables", "Study and office furniture", "Outdoor furniture"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918308764140",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Marathi"]
  }
}
</script>
```
Notes: `streetAddress` is `[CONFIRM]` with the owner (alternative: "Sakhare Vasti Rd, Phase 1, Rajiv Gandhi Infotech Park"). Do not add `image`, `logo` or `sameAs` until real hosted files/accounts exist; add an HTML comment `<!-- TODO: add logo, image, sameAs (Instagram, Facebook, YouTube, LinkedIn, Google Business Profile) -->` inside the `<head>` just above the script.

### TASK 3: Keyword-bearing hero copy (keep the H1)
- **Keep the H1** "Spaces shaped around your [life/style/choice/taste/peace/aura/vision/rhythm]" exactly (owner-approved).
- Change the small eyebrow above it (currently "Premium Furniture & interior • Pune" or similar) to: `Furniture Manufacturer · Hinjewadi, Pune`
- Replace the hero paragraph with:
  `Made-to-order furniture from our own manufacturing unit. Business established in 1992; furniture manufacturing since 2008. Share your dimensions, finishes or a reference image and we will discuss what can be made for your space.`
- Primary button: `Explore the catalogue`. Secondary button: `Discuss a custom requirement` (keep the same links).
- Replace the three hero stat cards with: `Made to fit / Your dimensions`, `Own unit / In-house manufacturing`, `Since 1992 / Furniture since 2008`. Remove "Premium / Luxury interior" and "B2B + B2C".

### TASK 4: About section
Use this copy (adjust only to fit existing tags):
- H2: `Established 1992. Furniture manufacturing since 2008.`
- P1: `Aakruti Enterprises was established in 1992 by Ajay Singh Chauhan and Ganesh Nirgun. We began manufacturing furniture in 2008 and today make furniture in our own manufacturing unit in Hinjewadi, Pune.`
- P2: `Every piece is made to order. Tell us your space, dimensions, preferred colours and finishes, or share a reference, and our team will discuss feasibility, a quotation and an estimated timeline. Aakruti is a furniture manufacturer; we do not offer complete interior design or turnkey interior work.`
- Replace the "Sustainability" value card with "Dependability: warranty support and after-sales help, with terms confirmed with your order." (Remove the sustainability claim.)

### TASK 5: Services/categories and headings
- Section heading: `Furniture we make to order`
- Intro: `Seven categories, each made to your requirements.`
- Cards (one short sentence each, no features that are not confirmed):
  1. Beds & Wardrobes: `Beds and wardrobes made to your room size, storage needs and finish.`
  2. Coffee & Centre Tables: `Coffee and centre tables in sizes and finishes that suit your living space.`
  3. Side Tables: `Side tables made to match your bed, sofa area or reading corner.`
  4. TV Units: `TV units made around your wall size, equipment and storage needs.`
  5. Study & Office Furniture: `Study tables and office furniture for homes, offices and project requirements.`
  6. Outdoor Furniture: `Outdoor furniture for balconies, terraces and gardens, made to order.`
  7. Custom Furniture: `Have a design or reference image? We will discuss what is feasible and quote it.`
- Remove any card or link for "Living & lounge/Sofas", "Dining & kitchen", "Decor & Furnishing", "Complete home interiors".
- Catalogue heading `Explore the catalogue`. Replace "100+ designs to explore" with `Browse our furniture categories`. Keep the filter buttons (All, Beds & Wardrobes, Coffee & Centre Tables, Side Tables, TV Units, Study & Office, Outdoor).
- Catalogue note: `Images are illustrative references. Final specifications and prices are confirmed on enquiry.` (keep this visible near the grid).

### TASK 6: Customer stories section
- Delete the **Dining room reference** story and its "Explore dining furniture" link.
- Remove the **Balakumar, Bangalore** testimonial unless the owner supplies the original, source and permission; if removed, replace that card with: `Customer stories coming soon. We publish only approved projects and reviews.`
- Rename the heading `Spaces, Well Lived` to `Projects & customer stories`.
- Keep living/bedroom/office reference cards only if each is clearly labelled `Illustrative reference image, not an Aakruti project`.

### TASK 7: "How we work" (process) copy
Use this order and wording: 1 `Share your requirement` (space, dimensions, references) · 2 `Site visit and measurements, where applicable` · 3 `Material, finish and colour selection` · 4 `Quotation and estimated timeline` · 5 `Approval and advance, then production` · 6 `Delivery and installation as applicable` · 7 `After-sales support`. Add a line: `Typical lead time is approximately 3–4 weeks; the final timeline is confirmed with the quotation.`

### TASK 8: Professionals section
- H2: `A furniture manufacturing partner for your projects.`
- P: `Architects, interior designers, builders, offices and hospitality teams can work with Aakruti for made-to-order furniture manufactured to project drawings or references, subject to feasibility.`
- Remove wording that implies Aakruti performs interior design or execution.
- Add one link: `Discuss a project on WhatsApp` → `https://wa.me/918308764140?text=Hello%20Aakruti%2C%20I%20would%20like%20to%20discuss%20a%20furniture%20project.`

### TASK 9: FAQ (visible text and FAQPage schema must match)
Use these questions and answers; delete any FAQ stating specific warranty years.

1. **Where is Aakruti Enterprises located?** `We are a furniture manufacturer in Hinjewadi, Pune, Maharashtra 411057. Appointments are preferred; call or WhatsApp +91 83087 64140.`
2. **What furniture do you make?** `We make beds, wardrobes, coffee and centre tables, side tables, TV units, study and office furniture, outdoor furniture and custom furniture, all made to order.`
3. **Do you make furniture to my size and design?** `Yes. You can discuss dimensions, colours and finishes, or share a reference image. We confirm feasibility and the final specification with your quotation.`
4. **How long does it take?** `Typical lead time is approximately 3–4 weeks. The final timeline depends on the product, customisation and workload, and is confirmed with the quotation.`
5. **Do you charge for consultation or delivery?** `Consultation and delivery are generally free within Pune, PCMC and nearby areas. For other locations, travel and transportation charges apply and are confirmed in advance.`
6. **How does payment work?** `Payment can be made by cash, UPI, bank transfer or cheque. The usual schedule is an advance before production starts, a further instalment when material reaches the site or during installation, and the balance after completion. Exact amounts and dates are confirmed in your quotation.` (Do not state percentages publicly until the owner confirms.)
7. **Do you offer a warranty?** `Warranty support and after-sales service are available. Terms and coverage are confirmed with the order.`
8. **Can I cancel an order?** `Orders cannot be cancelled once work has started. Please confirm your specifications before approving production.`
9. **What are your working hours?** `Monday to Saturday, 9:00 AM to 5:30 PM. Closed on Sunday.`
10. **Do you work with architects and interior designers?** `Yes. We manufacture furniture for architects, designers, builders, offices and hospitality projects, subject to feasibility.`

Add a matching JSON-LD block:
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
 {"@type":"Question","name":"Where is Aakruti Enterprises located?","acceptedAnswer":{"@type":"Answer","text":"We are a furniture manufacturer in Hinjewadi, Pune, Maharashtra 411057. Appointments are preferred; call or WhatsApp +91 83087 64140."}}
 /* ...one object per FAQ above, text identical to the visible answer... */
]}
</script>
```
(Remove the `/* */` comment in the final output and include every FAQ.)

### TASK 10: Contact section and footer (NAP)
- Show consistently in the contact section and footer:
  - `Aakruti Enterprises: Furniture Manufacturing`
  - `Hinjewadi, Pune, Maharashtra 411057` (street line `[CONFIRM]`)
  - `Phone / WhatsApp: +91 83087 64140` (both links)
  - `Mon–Sat 9:00 AM–5:30 PM · Sunday closed · Appointment preferred`
  - `Owner: Rushikesh Chauhan` (fine to keep)
- Add a "Get directions" link: `https://maps.app.goo.gl/cL5JcCFjrB4NHpUx8` (opens in new tab, `rel="noopener"`).
- Remove "Service in All India" or any all-India claim. Replace with: `Based in Hinjewadi, Pune. Serving Pune, Pimpri-Chinchwad and nearby areas; other locations on enquiry.`
- Enquiry form's dropdown: remove `Complete home interiors`; options become: Furniture catalogue enquiry · Custom furniture · Office / commercial project · Bulk / trade order.
- Footer lines: `Established 1992 | Furniture manufacturing since 2008` and keep `Designed & developed by Bharat Rasve`. Footer tagline: `Furniture Manufacturing · Hinjewadi, Pune`.
- Do not add an email address until the owner confirms one `[CONFIRM]`.

### TASK 11: Images and performance
- Every `<img>` needs a descriptive `alt`. For stock/reference photos use `Illustrative reference image: [what it shows]`. Do not describe them as Aakruti products.
- Add `width` and `height` attributes to every `<img>` (use the intrinsic ratio) to stop layout shift.
- Keep `loading="lazy"` on all images below the first screen; the hero image must not be lazy and should have `fetchpriority="high"`.
- Add `decoding="async"` to non-hero images.
- Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before the font stylesheet if not present.
- Leave HTML comments `<!-- REPLACE WITH REAL PHOTO: ... -->` next to each stock image so the owner can swap them.

### TASK 12: Accessibility and structure
- Exactly one `<h1>`. Headings must go h1 → h2 → h3 with no skipping.
- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`.
- Buttons and links need clear text (no "click here").
- Keep the cookie/analytics consent behaviour unchanged.

### TASK 13: New files to output (separate code blocks)
**robots.txt** (works only at the root of a custom domain; on github.io project paths it is ignored):
```
User-agent: *
Allow: /

Sitemap: https://project-bharat.github.io/Aakrutiwebpage/sitemap.xml
```
**sitemap.xml** (replace host when the custom domain is live):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://project-bharat.github.io/Aakrutiwebpage/</loc><lastmod>2026-10-31</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://project-bharat.github.io/Aakrutiwebpage/privacy.html</loc><lastmod>2026-10-31</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
```

## OUTPUT FORMAT
1. Return the **complete edited `index.html`** in one code block (do not truncate or say "rest unchanged").
2. Then return `robots.txt` and `sitemap.xml` in separate code blocks.
3. Then a **change log**: a short numbered list of what changed, by task number.
4. Then a **`[CONFIRM]` list**: every placeholder or fact still needing the owner (street address line, email, warranty terms, payment percentages, real photos, social links, testimonial permission).
5. Then a **self-check** confirming: no "sofa", "dining", "luxury", "interior design", "All India", "100+", or "sustainab" remains in visible text, meta, alt text or schema; one `<h1>`; one `<title>`; phone appears only as 8308764140 / +91 83087 64140; JSON-LD parses as valid JSON.

## QA CHECKLIST (the owner runs this after editing)
- [ ] Page title shows in the browser tab (≈51 characters)
- [ ] View source: no `meta name="keywords"`, no Unsplash URL in schema
- [ ] Rich Results Test (search.google.com/test/rich-results) passes for LocalBusiness and FAQPage
- [ ] Phone and WhatsApp buttons open correctly on a phone
- [ ] Catalogue filters, enquiry tray and consent banner still work
- [ ] Lighthouse mobile: Performance, SEO ≥ 90
- [ ] Submit sitemap in Google Search Console
