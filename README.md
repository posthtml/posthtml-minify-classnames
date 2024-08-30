<div align="center">
  <img width="150" height="150" alt="PostHTML" src="https://posthtml.github.io/posthtml/logo.svg">
  <h1>Minify Classnames</h1>
  <p>Rewrites classnames and ids in HTML and CSS to reduce file size.</p>

  [![Version][npm-version-shield]][npm]
  [![Build][github-ci-shield]][github-ci]
  [![License][license-shield]][license]
  [![Downloads][npm-stats-shield]][npm-stats]
</div>

# About

This PostHTML plugin minifies classnames and ids, reducing the weight of your HTML.

## Examples

- [Basic](examples/basic.md)
- [GenName](examples/genName.md)

## Installation

```sh
npm i -D posthtml-minify-classnames
```

## Usage

```js
import posthtml from 'posthtml'
import minify from 'posthtml-minify-classnames'

const html = `
  <style>
    #foo { color: red }
    .bar { color: blue }
    .baz { transition: all }
    .biz { color: green }
  </style>
  <div 
    id="foo" 
    class="bar"
    x-transition:enter="baz"
    x-transition:enter-start="biz"
  >baz</div>`

posthtml()
  .use(minify({
    filter: /^.bar/,
    genNameClass: 'genNameEmoji',
    genNameId: 'genNameEmoji',
    customAttributes: ['x-transition:enter'],
  }))
  .process(html)
  .then(result => {
    console.log(result.html)
  })
```

Result:

```html
<style>
  #a { color: red } 
  .bar { color: blue } 
  .b { transition: all }
  .biz { color: green }
</style>

<div 
  id="a" 
  class="bar" 
  x-transition:enter="b"
  x-transition:enter-start="biz"
>baz</div>
```

### External CSS

To use with external stylesheets, other plugins must be used, like [posthtml-inline-assets](https://github.com/jonathantneal/posthtml-inline-assets) and [posthtml-style-to-file](https://github.com/posthtml/posthtml-style-to-file), or other build task plugins.

## Options

You may use an options object to configure the plugin.

### `filter`

Type: `RegExp`\
Default: `/^.js-/`

Define a regular expression that will be used to exclude names from processing.

Classes and IDs that match this will not be minified.

### `genNameClass` & `genNameId`

Type: `Boolean|String`\
Default: `'genName'`

The name generator to use for classes and IDs.

Possible values:

- `'genName'` - generates the smallest possible names
- `'genNameEmoji'` - generates small emoji based names
- `'genNameEmojiString'` - generates random emoji with 3 emojis in each
- `false` - preserves names, use this to ignore ids or classes

#### Emoji based names

While emoji visually looks like a great way to reduce the size of input values, they often use 3-4 bytes or more (some can be over 20 bytes for a single rendered glyph). The below example 3 emoji string values range between 10-12 bytes in size, that's equivalent to ASCII strings up to 12 characters long. 

Meanwhile base36(`0-9,a-z`) provides an "alphabet" of 36 characters and an equivalent length of 3 characters is more than enough for most users (`36^3 = 46656`).

### `customAttributes`

Type: `String[]`\
Default: `[]`

An array of strings containing custom attribute names that will have their values minified.

### `removeUnused`

Type: `Boolean`\
Default: `true`

Whether to remove classes, attributes and other identifiers from the HTML that are not defined in the CSS.

Currently this only works for values in HTML attributes, it does not remove unused selectors from the CSS.

[npm]: https://www.npmjs.com/package/posthtml-minify-classnames
[npm-version-shield]: https://img.shields.io/npm/v/posthtml-minify-classnames.svg
[npm-stats]: http://npm-stat.com/charts.html?package=posthtml-minify-classnames
[npm-stats-shield]: https://img.shields.io/npm/dt/posthtml-minify-classnames.svg
[github-ci]: https://github.com/posthtml/posthtml-minify-classnames/actions/workflows/nodejs.yml
[github-ci-shield]: https://github.com/posthtml/posthtml-minify-classnames/actions/workflows/nodejs.yml/badge.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/posthtml-minify-classnames.svg
