# Marquee

A GSAP-powered marquee component that continuously scrolls content horizontally. Supports variable speed, pause on hover, reduced motion, and responsive resizing.

## Dependencies

- [GSAP](https://gsap.com/)

## HTML Attributes

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-marquee="component"` | Wrapper | — | Required. Marks the root marquee element. |
| `data-marquee="track"` | Inner track | — | Required. The element whose contents will be scrolled. |
| `data-speed` | Wrapper | Number (default: `100`) | Scroll speed in pixels per second. |
| `data-pause-hover` | Wrapper | `True` | Pauses the marquee on mouse hover. |
| `data-preview-content` | `.marquee_wrap` | `True` | Enables a grid preview layout in Webflow Designer. |

## Classes

| Class | Description |
|---|---|
| `.marquee_wrap` | Outer wrapper element. |
| `.marquee_track` | Inner track containing the scrolling items. |

## Notes

- The track is automatically cloned to create a seamless loop.
- Animation is paused automatically if the user has `prefers-reduced-motion` enabled.
- A `ResizeObserver` adjusts animation duration if the track width changes.
- Nested marquees are supported — inner components won't be double-initialized.
