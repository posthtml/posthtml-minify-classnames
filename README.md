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
``` html
<html>
  <style>
    .header__intro {
      color: blue;
    }
    .card--profile {
      background: white;
    }
  </style>
  <body>
    <p class="header__intro">OMG</p>
    <div class="card--profile">
      card content
    </div>
  </body>
</html>
```

After:
``` html
<html>
  <style>
    .a {
      color: blue;
    }
    a- {
      background: white;
    }
  </style>
  <body>
    <p class="a">OMG</p>
    <a->
      card content
    </a->
  </body>
</html>
```

## Installation

```sh
npm i -D posthtml-minify-classnames
```

## Usage

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

### genNameClass and genNameId

Type: string, Default: `'genName'`

Available options: `'genName'`, `'genNameEmoji'`

Future: Option to define own generator function.

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

### License [MIT](LICENSE)

[1]: https://github.com/posthtml/posthtml

[npm]: https://img.shields.io/npm/v/posthtml.svg
[npm-url]: https://npmjs.com/package/posthtml

[deps]: https://david-dm.org/posthtml/posthtml.svg
[deps-url]: https://david-dm.org/posthtml/posthtml

[build]: https://travis-ci.org/posthtml/posthtml.svg?branch=master
[build-badge]: https://travis-ci.org/posthtml/posthtml?branch=master

[cover]: https://coveralls.io/repos/posthtml/posthtml/badge.svg?branch=master
[cover-badge]: https://coveralls.io/r/posthtml/posthtml?branch=master
