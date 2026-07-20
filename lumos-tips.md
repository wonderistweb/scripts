# Lumos Tips & Tricks

A collection of handy snippets and notes for working with Lumos.

---

## Responsive Sizing

Use this `calc()` pattern to scale values across breakpoints using Lumos's responsive tokens. It blends a larger spacing value for large/medium screens and a smaller one for small/xsmall.

```css
calc(
  var(--_spacing---space--7) * max(var(--_responsive---large), var(--_responsive---medium)) +
  var(--_spacing---space--4) * max(var(--_responsive---small), var(--_responsive---xsmall))
)
```

**How it works:** The `--_responsive---*` variables resolve to `1` on their active breakpoint and `0` on all others, so `max(large, medium)` is `1` on large/medium and `0` on small/xsmall — effectively giving you a responsive multiplier without media queries.

---

## Color State Calc

Blends between two theme colors based on an on/off trigger variable — useful for hover or active states without extra classes.

```css
color-mix(
  in srgb,
  var(--_theme---button-primary--background) calc(100% * var(--_trigger---on)),
  var(--_theme---button-primary--background-hover) calc(100% * var(--_trigger---off))
)
```

---

## Responsive Flex Direction

Sets `flex-direction` to `column` at a given breakpoint and stays `row` above it. Apply only the line for the breakpoint you want to collapse at.

```css
flex-direction: var(--column-xsmall, row);
flex-direction: var(--column-small, row);
flex-direction: var(--column-medium, row);
flex-direction: var(--column-large, row);
```

---

## Utility Classes

### Component Element

| Class                                       | Description                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `u-layout-wrapper`                          | Outer wrapper for a layout section                                          |
| `u-layout`                                  | Main layout container                                                       |
| `u-layout-column-1`                         | First column in a layout                                                    |
| `u-layout-column-2`                         | Second column in a layout                                                   |
| `u-grid-wrapper`                            | Outer wrapper for a grid                                                    |
| `u-grid`                                    | Grid container                                                              |
| `u-content-wrapper`                         | Wraps content within a section                                              |
| `u-background-slot`                         | Slot for background elements (images, video, etc.)                          |
| `u-video`                                   | Video element                                                               |
| `u-image-wrapper`                           | Wraps an image element                                                      |
| `u-image`                                   | Image element                                                               |
| `u-iframe-wrapper`                          | Wraps an iframe                                                             |
| `u-iframe`                                  | Iframe element                                                              |
| `u-overlay`                                 | Overlay layer (e.g. for backgrounds or modals)                              |
| `u-eyebrow-{wrapper\|layout\|marker\|text}` | Eyebrow label parts: wrapper, layout, marker, and text                      |
| `u-text`                                    | Generic text element                                                        |
| `u-heading`                                 | Heading element                                                             |
| `u-button-wrapper`                          | Wraps one or more buttons                                                   |
| `u-section`                                 | Top-level section container                                                 |
| `u-section-spacer`                          | Adds spacing between sections                                               |
| `u-container-{small\|full}`                 | Content container — `small` is constrained width, `full` spans edge-to-edge |
| `u-svg`                                     | SVG element                                                                 |
| `u-icon`                                    | Icon element                                                                |
| `u-embed-{css\|js}`                         | Embed slot for custom CSS or JS                                             |

### Color

| Class                                   | Description                                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `u-theme-{inherit\|light\|dark\|brand}` | Sets the color theme context — `inherit` follows parent, `light`/`dark`/`brand` force a specific palette |
| `u-heading-accent`                      | Applies the accent color to a heading                                                                    |

### Typography

| Class                                                                | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `u-text-style-{display\|h1\|h2\|h3\|h4\|h5\|h6\|large\|main\|small}` | Applies a named type scale style regardless of the HTML element used |
| `u-rich-text`                                                        | Styles a block of rich text / WYSIWYG content                        |
| `u-line-height-{small\|medium\|large\|huge}`                         | Overrides line height with a named token                             |
| `u-letter-spacing-{tight\|normal}`                                   | Overrides letter spacing                                             |
| `u-sr-only`                                                          | Visually hidden but accessible to screen readers                     |
