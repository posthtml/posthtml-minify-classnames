# posthtml-minify-classnames

> This plugin rewrites classnames and ids inside of html and css files to reduce file size.


[![NPM][npm]][npm-url]
[![Build][build]][build-badge]
[![Coverage][cover]][cover-badge]

# Why ?

Minifying classnames allows you to write verbose classnames in your source code, and distribute a smaller package to your users or application.

## Support

- Tiny code competitions e.g., https://a-k-apart.com/
- Embeded devices like router admin panels e.g., http://www.dd-wrt.com/
- Mobile and responsive sites to keep the latency low e.g., https://developers.google.com/web/showcase/2015/googleplus
- SVG href attributes.

## Examples

- [Basic](examples/basic.md)
- [GenName](examples/genName.md)

## Installation

```sh
npm i -D posthtml-minify-classnames
```

## Usage

```js
const posthtml = require('posthtml');
const minifyClassnames = require('posthtml-minify-classnames');
const html = `
  <style>
    #foo { color: red }
    .bar { color: blue }
    .baz { transition: all }
  </style>
  <div 
    id="foo" 
    class="bar"
    x-transition:enter="baz"
  >baz</div>
`;

posthtml()
  .use(minifyClassnames({
    filter: /^.bar/,
    genNameClass: 'genNameEmoji',
    genNameId: 'genNameEmoji',
    customAttributes: ['x-transition:enter']
  }))
  .process(html)
  .then(function (result) {
    console.log(result.html);
  });
```

_**`=> result.html`**_
```html
<style>
  #a { color: red } 
  .bar { color: blue } 
  .b { transition: all; }
</style>

<div 
  id="a" 
  class="bar" 
  x-transition:enter="b"
>baz</div>
```

> Note: To use with external sheets, other plugins must be used, like [posthtml-inline-assets](https://github.com/jonathantneal/posthtml-inline-assets) and [posthtml-style-to-file](https://github.com/posthtml/posthtml-style-to-file), or other build task plugins.

## Options

#### `filter`

Type: `RegExp`  
Default: `/^.js-/`  
Description: *Regular expression that excludes names from processing*

#### `genNameClass` & `genNameId`

Type: `Boolean<false>|String<'genName'|'genNameEmoji'|'genNameEmojiString'>`  
Default: `'genName'`  
Description:  
- `'genName'` Generates the smallest possible names
- `'genNameEmoji'` Generates small emoji based names
- `'genNameEmojiString'` Generates random emoji with 3 emojis in each
- `false` Preserves names. Use this to ignore ids or classes

> **Note:** While emoji visually looks like a great way to reduce the size of input values, they often use 3-4 bytes or more (some can be over 20 bytes for a single rendered glyph). The below example 3 emoji string values range between 10-12 bytes in size, that's equivalent to ASCII strings up to 12 characters long. Meanwhile base36(`0-9,a-z`) provides an "alphabet" of 36 characters and an equivalent length of 3 characters is more than enough for most users (`36^3 = 46656`).

## TODO

- Option to define own generator function.



[posthtmlUrl]: https://github.com/posthtml/posthtml

[npm]: https://img.shields.io/npm/v/posthtml-minify-classnames.svg
[npm-url]: https://npmjs.com/package/posthtml-minify-classnames

[build]: https://travis-ci.org/posthtml/posthtml-minify-classnames.svg?branch=master
[build-badge]: https://travis-ci.org/posthtml/posthtml-minify-classnames?branch=master

[cover]: https://coveralls.io/repos/github/posthtml/posthtml-minify-classnames/badge.svg?cache
[cover-badge]: https://coveralls.io/github/posthtml/posthtml-minify-classnames?branch=master
