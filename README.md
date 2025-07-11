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

![illustration image](https://raw.githubusercontent.com/maynode/arch--text/refs/heads/main/demo/test.png)

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
