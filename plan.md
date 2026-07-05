# Plan: Product Details & Layout Amends

This plan outlines the identified issues, proposed solutions, and implementation steps to align and improve the design layout across all product detail pages for **SyokPod** and **SyokBar**.

---

## 📁 1. Gallery Image Extensions & Formatting Audit
We audited the actual files on disk inside the `public/products/` directory against references in [SyokPodCampaignGallery.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/SyokPodCampaignGallery.astro) and [SyokBarCampaignGallery.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/SyokBarCampaignGallery.astro).

### 🔍 Findings & Broken Paths
We identified **two key image extension discrepancies** that currently cause broken image assets on the live site:

1. **SyokPod Pro Campaign Gallery**:
   * **In code**: Maps posters 4, 5, and 6 to `.png` (e.g., `/products/syokpod/pro/syokpod-pro-4.png`).
   * **On disk**: The actual files are `.jpg` (e.g., `public/products/syokpod/pro/syokpod-pro-4.jpg`).
   * **Fix**: Change code extension mapping for these files to `.jpg`.

2. **SyokBar Camo Edition Gallery**:
   * **In code**: Maps poster 1 to `.png` (e.g., `/products/syokbar/SYOKBAR CAMO EDITION/camo-shoot-1.png`).
   * **On disk**: The actual file is `.jpg` (e.g., `public/products/syokbar/SYOKBAR CAMO EDITION/camo-shoot-1.jpg`).
   * **Fix**: Change code extension mapping for `camo-shoot-1` to `.jpg`.

All other standard, special, and target edition image files match the `.jpg` or `.webp` formats specified in their configurations.

---

## 🖼️ 2. Bento Gallery Image Crop Solutions
The bento grid currently crops images using `object-fit: cover` to fill cells of varying sizes. To show the full, uncropped images, we present three layout options:

### Option A: Grid with Lightbox Preview (Recommended)
Keep `object-fit: cover` on the grid previews so that the layout remains extremely clean and aligned. However, add a **Lightbox Overlay modal** so that clicking on any grid item opens the **full, uncropped image** in a clean premium overlay.
* *Pros*: Retains premium bento aesthetics; users can easily view full details on click.

### Option B: Masonry Layout (Flex Column wrap)
Instead of forcing images into fixed-height cells, we use a CSS Masonry / multi-column layout (`column-count: 2` or `3`). This lets images flow naturally vertically based on their original aspect ratios.
* *Pros*: Zero cropping.
* *Cons*: Grid items may align unevenly at the bottom.

### Option C: Horizontal Media Rail
Ditch the bento box and use the same horizontal mouse-drag scroll rail layout already used on the homepage. This keeps heights uniform while letting widths expand dynamically based on image aspect ratios.
* *Pros*: Zero cropping, consistent with the homepage branding.

---

## 📖 3. Narrative Section Cleaning
You requested removing the numbering and subtext/eyebrows from the narratives.

### Implementation:
1. **Remove numbers**: Remove the CSS pseudo-elements `::before` on `.product-narrative-shell` (and `.product-narrative-flow-2`) inside [product-detail.css](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/styles/product-detail.css#L411-L423) that generate the `"01"` and `"02"` text.
2. **Remove subtext/eyebrows**: Remove the `<span class="eyebrow">{narrative.eyebrow}</span>` tag inside the template [ProductNarrativeSection.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/ProductNarrativeSection.astro#L18).

---

## 🎨 4. Product Configurator Spacing (Breathing Room)
Currently, the variant picker and angle picker sit directly underneath the product stage with `gap: 0` in [ProductConfigurator.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/ProductConfigurator.astro#L125).

### Implementation:
Modify the `<style>` block in [ProductConfigurator.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/ProductConfigurator.astro#L125):
```diff
  .configurator-left-column {
    position: sticky !important;
    top: 100px !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
-   gap: 0 !important;
+   gap: 1.5rem !important; /* Adds natural breathing room */
  }
```

---

## 🍦 5. Unify KOHS Section Font Colors
In the KOHS section ([ProductFlavourIndex.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/ProductFlavourIndex.astro)), the eyebrow inherits `color: var(--red)` from the global CSS, creating a low-contrast "red-on-red" layout.

### Implementation:
Add an override rule in [product-detail.css](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/styles/product-detail.css):
```css
.product-flavour-index .eyebrow {
  color: var(--brand-cream) !important;
  opacity: 0.82;
}
```
This forces the eyebrow text to be styled in beige/cream, matching all other text in the KOHS section.

---

## ✍️ 6. Lengthen Feature Board Copywriting
To fill up vertical blank space in the feature board's left column, we will expand the secondary copy in [ProductFeatureBoard.astro](file:///Users/fadzryrosly/Documents/dreammade-prototype/src/components/product-detail/ProductFeatureBoard.astro#L86-L90).

### New Copywriting Block:
```html
<p class="feature-copy-secondary">
  Every detail is designed for seamless daily performance and styled to stand out. 
  From the ergonomic grip to the premium tactile finish, it brings together outstanding 
  engineering and the distinctive brand aesthetic in one cohesive experience. 
  Built with high-grade, resilient materials, the chassis is balanced for tactile feedback 
  and optimized weight distribution, delivering a reliable, luxurious feel from the very 
  first draw to the last. This system is not just an accessory; it is a refined statement 
  of utility, engineered to endure daily carry while keeping your daily rhythm clean 
  and completely uninterrupted.
</p>
```
This adds enough visual density to balance the tall portrait video player on the right.
