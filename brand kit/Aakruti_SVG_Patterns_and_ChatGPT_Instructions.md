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

@media (max-width:640px) { .pattern-layer { opacity:.7; background-size:90px 156px; } }
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
> **Where to use it (maximum 4 places on the whole page):**
> 1. **Hero:** a right-hand or lower band behind the headline area, faded with `.pattern-fade-right`, using `pattern-ivory-herring` on an ivory hero or `pattern-slate-herring` on a slate hero. Keep the product/hero photo clear of it.
> 2. **"Established 1992 · Manufacturing since 2008" band or About header:** `pattern-ivory-peak`, behind the heading only.
> 3. **Enquiry / contact call-to-action band:** `pattern-slate-diamond` on a slate band with a white heading and a solid panel behind any form fields.
> 4. **Footer top edge:** a narrow strip, 48–64 px tall, `pattern-slate-herring`.
>
> **Rules for wise use:**
> - **One pattern family per viewport.** Do not mix diamond, herringbone and peak in the same screen. Use herringbone as the default; peak for About; diamond only for the CTA band.
> - **Never behind body paragraphs, product cards, catalogue images, forms, FAQs, or testimonials.** Text must sit on a flat colour. If a pattern is near text, place the text in `.content` with a solid background colour.
> - **Subtle only.** Keep the baked-in opacity (10–12%). Do not raise it. Pattern coverage must stay under about 20% of any screen.
> - **Photography is the hero.** Product photos stay uncovered; no pattern overlays on images.
> - **No animation, parallax or hover effects** on the pattern.
> - **Decorative semantics:** apply patterns through CSS backgrounds or empty `<div aria-hidden="true">` layers. Never as `<img>` and never with alt text.
> - **Contrast:** all text over a slate band must stay white on slate (AA contrast). All text over ivory must be slate.
> - **Mobile:** use the provided media query (smaller tile, lower opacity). If any text becomes harder to read on a 360 px screen, remove the pattern from that block.
> - **Performance:** keep patterns as inline data URIs in the existing `<style>`; do not add image files or new network requests.
> - **Dark mode:** if the page supports dark mode, swap `pattern-ivory-*` for `pattern-slate-*` classes.
> - **Do not use the pattern as a wallpaper behind the whole page.**
>
> **Also check while you're there (do not expand scope):** if the page uses an orange accent (`#F28C28` or similar) in the pattern areas, leave it for now and list it in your report; it is outside the brand palette.
>
> **Output format:**
> 1. The complete edited `index.html` in one code block (no truncation).
> 2. A short change log listing exactly which four sections received which pattern class.
> 3. A self-check confirming: max 4 pattern placements, no coral in any pattern, no pattern behind text/photos/forms, `aria-hidden="true"` on every pattern layer, no new files or external requests.

---

## Notes for the owner
- Geometry was fitted to the kit tiles by sampling each line segment; it matches to within a few pixels. Check one rendered copy against the kit's printed swatches before using in print. For print and signage, request vector masters from the designer.
- The kit's fonts are Lora and Poppins stand-ins; the website currently uses Cormorant Garamond and Plus Jakarta Sans. Settle this separately.
