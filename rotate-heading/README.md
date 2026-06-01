# Rotate Heading

A GSAP-powered heading rotation component that cycles through child elements with a vertical slot-machine animation. Supports configurable timing, reduced motion, and responsive resizing.

## Dependencies

- [GSAP](https://gsap.com/)

## HTML Attributes

| Attribute | Element | Value | Description |
|---|---|---|---|
| `data-rotate-heading="component"` | Wrap | — | Required. Marks the root element. |
| `data-rotate-heading="slot"` | Slot | — | Required. The element whose children will be animated. |
| `data-duration` | Wrap | Number (default: `0.4`) | Duration in seconds of each enter/exit animation. |
| `data-delay` | Wrap | Number (default: `1.5`) | Time in seconds each heading is held visible. |

## Classes

| Class | Description |
|---|---|
| `.rotate-heading_wrap` | Outer wrapper element. Holds data attributes. |
| `.rotate-heading_slot` | Inner slot element. Direct children are the rotating headings. |

## Notes

- All direct children of the slot are treated as headings — no class required.
- Each heading is forced to the height of the tallest heading so `y: 100%` travels a consistent distance across all items.
- Animation is paused automatically if the user has `prefers-reduced-motion` enabled.
- A `ResizeObserver` on the wrap recalculates heading heights on resize with no feedback loop risk.
- Nested components are supported — inner components won't be double-initialized.
