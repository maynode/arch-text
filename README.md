# ArchText

ArchText is a simple and easy-to-use JavaScript library for arranging text along an arch.

## Installation

```bash
npm install arch-text
```

Or, if using locally:

```js
import ArchText from "arch-text";
```

## Basic Usage

1. Prepare your HTML:

```html
<div id="wrapper">Hello World! This is a test!</div>
```

2. Initialize ArchText in your JavaScript/TypeScript:

```js
import ArchText from "arch-text";

new ArchText("#wrapper", {
  radius: 100,
  dir: 1,
  rotate: true,
  reverse: false,
});
```

## Illustration

![illustration image](data:image/png;base64,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)

## Options

| Option  | Type    | Default | Description                                                                   |
| ------- | ------- | ------- | ----------------------------------------------------------------------------- |
| radius  | number  | 0       | Arch radius in pixels. Must be greater than half the text width. -1 for none. |
| dir     | number  | 1       | 1 for normal arch, -1 for upside down arch.                                   |
| rotate  | boolean | true    | Whether to rotate each letter along the arch.                                 |
| reverse | boolean | false   | Whether to reverse the entire text (180° rotation).                           |

## Notes

- The `radius` value controls how arch the text is. Larger values make the arch flatter.
- If `radius` is set to -1, the text will be displayed in a straight line.
- The target element can be a CSS selector string or a direct HTMLElement.

## License

MIT
