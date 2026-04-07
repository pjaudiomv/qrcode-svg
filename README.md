## Introduction

A browser-only ES module for generating SVG QR codes in pure JavaScript.

- pure JavaScript, zero dependencies
- ESM only
- SVG output

## Getting Started

Install the package:

```bash
npm install @pjaudiomv/qrcode-svg
```

Inline example:

```javascript
import QRCode from '@pjaudiomv/qrcode-svg'

const svg = new QRCode('Hello World!').svg()
```

More options:

```javascript
const qrcode = new QRCode({
    content: 'http://github.com/',
    padding: 4,
    width: 256,
    height: 256,
    color: '#000000',
    background: '#ffffff',
    ecl: 'M',
})
const svg = qrcode.svg()
```

## Options

**List of options:**

- **content** - QR Code content, the only **required** parameter
- **padding** - white space padding, `4` modules by default, `0` for no border
- **width** - QR Code width in pixels
- **height** - QR Code height in pixels
- **color** - color of modules (squares), color name or hex string, e.g. `#000000`
- **background** - color of background, color name or hex string, e.g. `white`
- **ecl** - error correction level: `L`, `M`, `H`, `Q`
- **join** - join modules (squares) into one shape, into the SVG `path` element, **recommended** for web and responsive use, default: `false`
- **predefined** - to create a squares as pattern, then populate the canvas, default: `false`, see the output examples below
- **pretty** - apply indents and new lines, default: `true`
- **swap** - swap X and Y modules, only if you have issues with some QR readers, default: `false`
- **xmlDeclaration** - prepend XML declaration to the SVG document, i.e. `<?xml version="1.0" standalone="yes"?>`, default: `true`
- **container** - wrapping element, default: `svg`, see below

**Container options:**

- **svg** - populate squares in a SVG document with `width` and `height` attributes, recommended for converting to raster images or PDF where QR Code is being static (exact size)
- **svg-viewbox** - populate squares in a SVG document with `viewBox` attribute, **recommended** for responsive web pages
- **g** - put squares in `g` element, useful when you need to put multiple QR Codes in a single SVG document
- **none** - no wrapper
- **path-data** - returns only the raw SVG path data string (requires `join: true`)

## SVG output

### Editable squares

This mode is useful for designers to manipulate with particular squares.
Thus, one can open the QR Code in an editor, select particular modules, move around, change color, etc.
However, some old SVG viewers may generate minor gaps between the squares - the side effect when rendering an image at certain zoom level.

Default options

```javascript
const qrcode = new QRCode({
    content: 'Pretty Fox',
    join: false,
    predefined: false,
})
```

Output with `rect` elements

```xml
<?xml version="1.0" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256">
  <rect x="0" y="0" width="256" height="256" style="fill:#ffffff;shape-rendering:crispEdges;"/>
  <rect x="16" y="16" width="8" height="8" style="fill:#000000;shape-rendering:crispEdges;"/>
  <rect x="24" y="16" width="8" height="8" style="fill:#000000;shape-rendering:crispEdges;"/>
  <rect x="32" y="16" width="8" height="8" style="fill:#000000;shape-rendering:crispEdges;"/>
  ...
</svg>
```

### Responsive web page

Squares joined into one `path` shape produce a compact file size, i.e. 4-5x reduced compared with `rect` elements.
A single `path` element will result in an optimized rendering, thus not producing any minor gaps between the squares.
Also using the container with `viewBox` attribute may contribute to the responsive scaling on the web.

Set `join` to `true`

```javascript
const qrcode = new QRCode({
    content: 'Pretty Fox',
    join: true,
    container: 'svg-viewbox', //Useful but not required
})
```

Output with `path` element

```xml
<?xml version="1.0" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 256 256">
  <rect x="0" y="0" width="256" height="256" style="fill:beige;shape-rendering:crispEdges;"/>
  <path x="0" y="0" style="fill:blue;shape-rendering:crispEdges;" d="M35.31,35.31 V44.14 H44.14 V35.31 H35.31 Z..." />
</svg>
```

### Predefined pattern

Algorithm defines the square pattern once before populating a canvas. Useful if you want to generate QR Code with candies.
However, some SVG software and converters do not support `defs` or `use` elements.

Set `predefined` to `true`

```javascript
const qrcode = new QRCode({
    content: 'Pretty Fox',
    predefined: true,
})
```

Output with `defs` and `use` elements

```xml
<?xml version="1.0" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256">
  <defs><path id="qrmodule" d="M0 0 h8.827586206896552 v8.827586206896552 H0 z" style="fill:maroon;shape-rendering:crispEdges;" /></defs>
  <rect x="0" y="0" width="256" height="256" style="fill:beige;shape-rendering:crispEdges;"/>
  <use x="35.310344827586206" y="35.310344827586206" href="#qrmodule" />
  <use x="44.13793103448276" y="35.310344827586206" href="#qrmodule" />
  ...
</svg>
```

## Usage in the browser

```html
<!DOCTYPE html>
<html>
    <body>
        <div id="container"></div>
        <script type="module">
            import QRCode from './dist/qrcode.js'
            const qrcode = new QRCode({
                content: 'Hello World!',
                container: 'svg-viewbox',
                join: true,
            })
            document.getElementById('container').innerHTML = qrcode.svg()
        </script>
    </body>
</html>
```

## Thanks

Thanks to [davidshimjs](https://github.com/davidshimjs/qrcodejs) for the base library.

Thanks to [Kazuhiko Arase](http://www.d-project.com/) for the original QR Code in JavaScript algorithm.

Thanks to all contributors on the GitHub.

## Legal notice

```
Licensed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
http://www.denso-wave.com/qrcode/faqpatent-e.html
```
