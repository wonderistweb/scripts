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
