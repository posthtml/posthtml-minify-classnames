# posthtml-minify-classnames

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Coverage][cover]][cover-badge]

`posthtml-minify-classnames` is a [PostHTML][1] plugin that rewrites classnames and ids inside of html and css files to reduce file size.

Minifying classnames allows you to write verbose classnames in your source code, and distribute a smaller package to your users or application.

Use cases include:

- Tiny code competitions e.g., https://a-k-apart.com/
- Embeded devices like router admin panels e.g., http://www.dd-wrt.com/
- Mobile and responsive sites to keep the latency low e.g., https://developers.google.com/web/showcase/2015/googleplus

`posthtml-minify-classnames` supports svg xlink attributes.

Before:
```html
<html>
  <style>
    #some-id {
      text-transform: uppercase;
    }
    .header__intro {
      color: blue;
    }
    .card--profile {
      background: white;
    }
    .js-overlay {
      display: none;
    }
    #js-button {
      color: blue;
    }
    @media (min-width: 768px) {
      .header__intro {
        color: gray;
      }
    }
  </style>
  <body>
    <svg style="display:none">
      <symbol id="icon-location"><path d=""></path></symbol>
    </svg>
    <h1 id="some-id">Title</h1>
    <p class="header__intro">OMG</p>
    <div class="js-overlay"></div>
    <div id="js-button"></div>
    <div class="card--profile">
      card content
    </div>
    <svg>
      <use xlink:href="#icon-location"></use>
    </svg>
    <label for="username">Click me</label>
    <input type="text" id="username">
  </body>
</html>
```

After:

```html
<html>
  <style>
    #a {
      text-transform: uppercase;
    }
    .a {
      color: blue;
    }
    .b {
      background: white;
    }
    .js-overlay {
      display: none;
    }
    #js-button {
      color: blue;
    }
    @media (min-width: 768px) {
      .a {
        color: gray;
      }
    }
  </style>
  <body>
    <svg style="display:none">
      <symbol id="b"><path d=""></path></symbol>
    </svg>
    <h1 id="a">Title</h1>
    <p class="a">OMG</p>
    <div class="js-overlay"></div>
    <div id="js-button"></div>
    <div class="b">
      card content
    </div>
    <svg>
      <use xlink:href="#b"></use>
    </svg>
    <label for="c">Click me</label>
    <input type="text" id="c">
  </body>
</html>
```

## Installation

```sh
npm i -D posthtml-minify-classnames
```

## Usage

Note: To use with external sheets, other plugins must be used, like [posthtml-inline-assets](https://github.com/jonathantneal/posthtml-inline-assets) and [posthtml-style-to-file](https://github.com/posthtml/posthtml-style-to-file), or other build task plugins.

```js
var posthtml = require('posthtml');
var minifyClassnames = require('posthtml-minify-classnames');

posthtml()
  .use(minifyClassnames({
    filter: /^.js-/,
    genNameClass: 'genNameEmoji',
    genNameId: 'genNameEmoji',
  }))
  .process(`
    <style>
      #foo { color: red }
      .bar { color: blue }
    </style>
    <div id="foo" class="bar">baz</div>
  `)
  .then(function(result) {
    console.log(result.html); //=> '<style>#a { color: red } .bar { color: blue }</style><div id="a" class="bar">baz</div>'
  });
```

## Options

### filter

Type: regex, Default: `/^.js-/`

### genNameClass & genNameId

Type: string, Default: `'genName'`

Available options: `'genName'`, `'genNameEmoji'`, `'genNameEmojiString'`

- `'genName'` Generates the smallest possible names
- `'genNameEmoji'` Generates small emoji based names
- `'genNameEmojiString'` Generates random emoji with 3 emojis in each

Example:

```html
<html>
  <style>
    #🚧🕥🏉 {
      text-transform: uppercase;
    }
    .☘👙📙 {
      color: blue;
    }
    .⏲📂⚗ {
      background: white;
    }
    .js-overlay {
      display: none;
    }
    #js-button {
      color: blue;
    }
    @media (min-width: 768px) {
      .☘👙📙 {
        color: gray;
      }
    }
  </style>
  <body>
    <svg style="display:none">
      <symbol id="👂🗨🌹"><path d=""></path></symbol>
    </svg>
    <h1 id="🚧🕥🏉">Title</h1>
    <p class="☘👙📙">OMG</p>
    <div class="js-overlay"></div>
    <div id="js-button"></div>
    <div class="⏲📂⚗">
      card content
    </div>
    <svg>
      <use xlink:href="#👂🗨🌹"></use>
    </svg>
    <label for="🏻🔐🙍">Click me</label>
    <input type="text" id="🏻🔐🙍">
  </body>
</html>
```

Future: Option to define own generator function.

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

### License [MIT](LICENSE)

[1]: https://github.com/posthtml/posthtml

[npm]: https://img.shields.io/npm/v/posthtml-minify-classnames.svg
[npm-url]: https://npmjs.com/package/posthtml-minify-classnames

[deps]: https://david-dm.org/simonlc/posthtml-minify-classnames.svg
[deps-url]: https://david-dm.org/simonlc/posthtm-minify-classnames

[build]: https://travis-ci.org/simonlc/posthtml-minify-classnames.svg?branch=master
[build-badge]: https://travis-ci.org/simonlc/posthtml-minify-classnames?branch=master

[cover]: https://coveralls.io/repos/github/simonlc/posthtml-minify-classnames/badge.svg?cache
[cover-badge]: https://coveralls.io/github/simonlc/posthtml-minify-classnames?branch=master
