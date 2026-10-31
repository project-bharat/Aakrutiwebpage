# Aakruti Brand Pattern: SVG Code + Instructions for ChatGPT

Patterns below are rebuilt as clean vector geometry from the brand kit tiles (`03_Patterns`). Each tile is **240 × 416 units**. All lines are straight, with the kit's angular joints (about 60° diagonals) echoing the logo. Lines at the tile edges (x = 0 and x = 240) tile seamlessly. Colours come from the kit: Slate `#525266`, White, Ivory `#F7F4F1`. Coral is **not** used in patterns.

Chevron (the fourth kit pattern) is not included because its tile is a different, much larger artwork. Use the three below.

---

## 1. Raw SVG tiles (slate lines, for light backgrounds)

### Diamond
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="416" viewBox="0 0 240 416"><path d="M0 0V416M120 0V416M240 0V416M0 0L240 416M240 0L0 416" fill="none" stroke="#525266" stroke-opacity="1" stroke-width="4.5"/></svg>
```

### Herringbone
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="416" viewBox="0 0 240 416"><path d="M0 0V416M120 0V416M240 0V416M0 0L120 208L240 0M0 208L120 416L240 208" fill="none" stroke="#525266" stroke-opacity="1" stroke-width="4.5"/></svg>
```

### Peak
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="416" viewBox="0 0 240 416"><path d="M0 0V416M120 0V416M240 0V416M120 0L0 208M120 0L240 208M120 208L0 416M120 208L240 416M65 114H175M65 322H175" fill="none" stroke="#525266" stroke-opacity="1" stroke-width="4.5"/></svg>
```

For dark (slate) backgrounds, change `stroke="#525266"` to `stroke="#ffffff"` and lower the opacity (see below).

---

## 2. Ready-to-use CSS (paste into the page `<style>`)

Colours and opacity are baked into the data URI because CSS variables don't work inside `data:` SVGs. Tile size 240×416 is displayed at half scale (120×208) so lines stay fine.

```css
/* Brand patterns: decorative only */
.pattern-ivory-diamond   { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M0 0L240 416M240 0L0 416%22 fill=%22none%22 stroke=%22%23525266%22 stroke-opacity=%220.1%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }
.pattern-ivory-herring   { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M0 0L120 208L240 0M0 208L120 416L240 208%22 fill=%22none%22 stroke=%22%23525266%22 stroke-opacity=%220.1%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }
.pattern-ivory-peak      { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M120 0L0 208M120 0L240 208M120 208L0 416M120 208L240 416M65 114H175M65 322H175%22 fill=%22none%22 stroke=%22%23525266%22 stroke-opacity=%220.1%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }

.pattern-slate-diamond   { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M0 0L240 416M240 0L0 416%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%220.12%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }
.pattern-slate-herring   { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M0 0L120 208L240 0M0 208L120 416L240 208%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%220.12%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }
.pattern-slate-peak      { background-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22416%22 viewBox=%220 0 240 416%22%3E%3Cpath d=%22M0 0V416M120 0V416M240 0V416M120 0L0 208M120 0L240 208M120 208L0 416M120 208L240 416M65 114H175M65 322H175%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%220.12%22 stroke-width=%224.5%22/%3E%3C/svg%3E"); background-size:120px 208px; }

/* Use as a layer that never sits under text directly */
.pattern-layer { position:absolute; inset:0; pointer-events:none; z-index:0; }
.pattern-host  { position:relative; isolation:isolate; }
.pattern-host > .content { position:relative; z-index:1; }

/* Soft fade so the pattern dissolves into the page */
.pattern-fade-right { -webkit-mask-image:linear-gradient(to left,#000 0%,transparent 70%); mask-image:linear-gradient(to left,#000 0%,transparent 70%); }

/* Fading strip variants */
.pattern-fade-up      { -webkit-mask-image:linear-gradient(to top,#000 0%,transparent 100%); mask-image:linear-gradient(to top,#000 0%,transparent 100%); }
.pattern-fade-corner  { -webkit-mask-image:radial-gradient(circle at 100% 0%,#000 0%,transparent 70%); mask-image:radial-gradient(circle at 100% 0%,#000 0%,transparent 70%); }
.pattern-strip-card   { position:absolute; top:0; right:0; width:96px; height:100%; pointer-events:none; z-index:0; -webkit-mask-image:linear-gradient(to left,#000 0%,transparent 100%); mask-image:linear-gradient(to left,#000 0%,transparent 100%); }
.pattern-footer-band  { position:absolute; left:0; right:0; top:0; height:140px; pointer-events:none; z-index:0; }
.pattern-divider      { height:48px; -webkit-mask-image:linear-gradient(to right,transparent,#000 20%,#000 80%,transparent); mask-image:linear-gradient(to right,transparent,#000 20%,#000 80%,transparent); }

@media (max-width:640px) { .pattern-layer { opacity:.7; background-size:90px 156px; } .pattern-strip-card { display:none; } }
@media (prefers-reduced-data:reduce) { .pattern-layer { display:none; } }
```

Example markup (decorative layer is empty and hidden from screen readers):
```html
<section class="pattern-host" style="background:#525266;color:#fff">
  <div class="pattern-layer pattern-slate-herring pattern-fade-right" aria-hidden="true"></div>
  <div class="content"> ...hero text... </div>
</section>
```

---

# PASTE THIS TO CHATGPT (instructions for using the pattern on the webpage)

> **Role:** You are editing `index.html` for Aakruti Enterprises, a furniture manufacturer in Hinjewadi, Pune. Add the brand geometric pattern to the page **sparingly and purposefully**. Do not redesign the page, rename classes, or remove any existing JavaScript behaviour.
>
> **Assets:** Use the CSS classes and SVG data URIs from the section "Ready-to-use CSS" exactly as given. Do not redraw, rotate, recolour, add gradients to, or alter the line geometry. Do not introduce any other pattern or illustration.
>
> **Brand colours:** Slate `#525266`, Coral `#FF6666`, White, Ivory `#F7F4F1`, Warm stone `#CBBEB5`. The pattern uses only slate on light surfaces or white on slate surfaces. **Coral is never used in the pattern.** Coral stays limited to thin rules, small labels and the logo's ENTERPRISES line.
>
> **Where to use it (this is the complete list; nowhere else):**
> 1. **Header: none.** Keep the header clean. The only allowed accent is a 2–3 px coral rule under the header, which is not a pattern.
> 2. **Hero: one fading strip.** An `aria-hidden` `.pattern-layer` on the right or lower edge of the hero with `.pattern-fade-right` (or `.pattern-fade-up` for a lower edge). Use `pattern-ivory-herring` on an ivory hero or `pattern-slate-herring` on a slate hero. Keep the headline, buttons and hero photo clear of it.
> 3. **Footer: the main pattern area.** Slate footer. Add `.pattern-footer-band` with `pattern-slate-herring pattern-fade-up` across the top of the footer (about 140 px tall), fading into plain slate. Address, phone, hours and links sit on flat slate with a higher z-index.
> 4. **Selected cards only: a fading edge strip.** Add one empty `<div class="pattern-strip-card pattern-ivory-herring" aria-hidden="true">` inside these cards only: "Why Aakruti / values" cards, "How we work" process cards, and the "Professionals" cards. Give each of those cards `position:relative; overflow:hidden`. Keep card text on the left side, clear of the strip. Use the same single pattern on all of them.
> 5. **Optional: at most 1–2 section dividers.** A `.pattern-divider pattern-ivory-herring` band between two light sections (for example between About and Services). Do not add more.
>
> **Never use the pattern on:** the header, navigation, the page body background, catalogue/product cards, product or project photos, testimonials, FAQ items, the enquiry form fields, the enquiry tray, or the cookie banner.
>
> **Rules for wise use:**
> - **Overall light background: not allowed.** Page and section backgrounds stay flat ivory (`#F7F4F1`), white or slate.
> - **One pattern per screen:** herringbone is the default for hero, cards, footer and dividers. Use peak only for the About heading area if you want variety. Use diamond only on the enquiry/contact band (optional, with a solid panel behind the form).
> - **Every pattern edge must fade** (mask). No hard-edged pattern blocks.
> - **Subtle only.** Keep the baked-in opacity (10–12%). Do not raise it. Pattern may cover no more than about 20% of any screen.
> - **Text sits on flat colour.** Put text in a `.content` wrapper with a higher z-index. If a pattern is near text, text stays slate on ivory or white on slate (AA contrast).
> - **No animation, parallax or hover effects** on patterns.
> - **Decorative semantics:** patterns are CSS backgrounds on empty `<div aria-hidden="true">` layers. Never `<img>`, never alt text.
> - **Mobile:** use the provided media query. Card strips are hidden below 640 px; if text becomes hard to read on a 360 px screen, remove the pattern from that block.
> - **Performance:** keep patterns as inline data URIs in the existing `<style>`; no extra image files or network requests.
> - **Dark mode:** if the page supports it, use `pattern-slate-*` classes on dark surfaces.
>
> **Also check while you're there (do not expand scope):** if the page uses an orange accent (`#F28C28` or similar) in the pattern areas, leave it for now and list it in your report; it is outside the brand palette.
>
> **Output format:**
> 1. The complete edited `index.html` in one code block (no truncation).
> 2. A short change log listing exactly where each pattern class was added: hero, footer, each card type, and any dividers.
> 3. A self-check confirming: no pattern in the header or page background; pattern only in the hero strip, footer band, the three named card types and at most two dividers; no coral in any pattern; no pattern behind text, photos, catalogue cards, forms or testimonials; `aria-hidden="true"` on every pattern layer; no new files or external requests.

---

## Notes for the owner
- Geometry was fitted to the kit tiles by sampling each line segment; it matches to within a few pixels. Check one rendered copy against the kit's printed swatches before using in print. For print and signage, request vector masters from the designer.
- The kit's fonts are Lora and Poppins stand-ins; the website currently uses Cormorant Garamond and Plus Jakarta Sans. Settle this separately.
