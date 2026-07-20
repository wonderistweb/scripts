# Wonderist Scripts

A shared library of copy-paste scripts and snippets used across Wonderist Webflow builds. Nothing is installed or imported — files here serve as the source of truth that gets pasted into Webflow's custom code panels.

---

## Getting Started on a New Site

Copy the contents of `base-site/head.html` into **Site Settings → Custom Code → Head Code**, and `base-site/footer.html` into **Site Settings → Custom Code → Footer Code**. Remove any blocks that aren't needed for the project (e.g. Plyr if there are no video players, AJAX modal if there are no CMS modals).

---

## File Reference

### Base Site

| File | Description | Where it goes |
|---|---|---|
| `base-site/head.html` | CSS preloads (Swiper, Plyr) + Plyr custom styles | Webflow site-wide `<head>` |
| `base-site/footer.html` | Vendor scripts + lazy video + Plyr + AJAX modal + Superflow | Webflow site-wide footer code |

### Standalone Scripts

These are the source of truth for the scripts embedded inline in `footer.html`. When a script is updated here, the corresponding block in `footer.html` (and any existing sites using it) should be updated to match.

| File | Description | Where it goes |
|---|---|---|
| `lazy-video.js` | Lazy loads videos with `data-src` and pauses them when out of viewport | Webflow footer code |
| `plyr-video.js` | Plyr.io init, custom cover, mobile tap to play/pause, fullscreen handling | Webflow footer code |
| `ajax-modal.js` | AJAX-powered CMS lightbox modal with GSAP animation and focus management | Webflow footer code |
| `superflow-script.html` | Superflow/Velt custom comment priority config | Webflow footer code, before the Superflow embed snippet |

### Page-Level Snippets

| File | Description |
|---|---|
| `misc.html` | Miscellaneous one-off snippets |
| `ppc-base.html` | Base setup for PPC landing pages |

> **Note:** Marquee, rotate-heading, and counterup have moved to the [components repo](https://github.com/wonderistweb/components).

---

## Notes

- Vendor scripts (Swiper, Plyr) are loaded via CDN with pinned versions. Bump the version number in both `head.html` and `footer.html` if upgrading.
- The CSS preload pattern in `head.html` loads stylesheets non-blocking. No `<noscript>` fallback is needed since all Webflow sites require JS.
- Superflow must remain a synchronous `<script>` (no `defer`) per vendor requirements.
- The `lazy-video.js` script targets all `<video>` elements on the page — it coexists with Plyr since Plyr manages its own video elements separately.
