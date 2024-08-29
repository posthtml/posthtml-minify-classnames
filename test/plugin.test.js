import plugin from '../lib'
import posthtml from 'posthtml'
import { expect, test } from 'vitest'

test('name gen', async () => {
  const html = `
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
  </html>`

  const expected = `
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
  </html>`

  expect(
    await posthtml().use(plugin({ filter: /^.js-/ })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('emoji name gen', async () => {
  const html = `
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
  </html>`

  const expected = `
  <html>
    <style>
      #😀 {
        text-transform: uppercase;
      }
      .😀 {
        color: blue;
      }
      .😁 {
        background: white;
      }
      .js-overlay {
        display: none;
      }
      #js-button {
        color: blue;
      }
      @media (min-width: 768px) {
        .😀 {
          color: gray;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="😁"><path d=""></path></symbol>
      </svg>
      <h1 id="😀">Title</h1>
      <p class="😀">OMG</p>
      <div class="js-overlay"></div>
      <div id="js-button"></div>
      <div class="😁">
        card content
      </div>
      <svg>
        <use xlink:href="#😁"></use>
      </svg>
      <label for="😂">Click me</label>
      <input type="text" id="😂">
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({ 
      filter: /^.js-/,
      genNameClass: 'genNameEmoji',
      genNameId: 'genNameEmoji',
    })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('emoji string name gen', async () => {
  const html = `
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
  </html>`

  const expected = `
  <html>
    <style>
      #🚹🛵🔂 {
        text-transform: uppercase;
      }
      .💠🍀🆔 {
        color: blue;
      }
      .🌳🥔🎅 {
        background: white;
      }
      .js-overlay {
        display: none;
      }
      #js-button {
        color: blue;
      }
      @media (min-width: 768px) {
        .💠🍀🆔 {
          color: gray;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="🏋🐎🐪"><path d=""></path></symbol>
      </svg>
      <h1 id="🚹🛵🔂">Title</h1>
      <p class="💠🍀🆔">OMG</p>
      <div class="js-overlay"></div>
      <div id="js-button"></div>
      <div class="🌳🥔🎅">
        card content
      </div>
      <svg>
        <use xlink:href="#🏋🐎🐪"></use>
      </svg>
      <label for="😮📃🚼">Click me</label>
      <input type="text" id="😮📃🚼">
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({ 
      filter: /^.js-/,
      genNameClass: 'genNameEmojiString',
      genNameId: 'genNameEmojiString',
    })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('ignored pattern should not affect use#href', async () => {
  const html = `
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
  </html>`

  const expected = `
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
        <symbol id="icon-location"><path d=""></path></symbol>
      </svg>
      <h1 id="a">Title</h1>
      <p class="a">OMG</p>
      <div class="js-overlay"></div>
      <div id="js-button"></div>
      <div class="b">
        card content
      </div>
      <svg>
        <use xlink:href="#icon-location"></use>
      </svg>
      <label for="b">Click me</label>
      <input type="text" id="b">
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({ 
      filter: /^#icon-|^.js/,
    })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('should work with xlink:href and href', async () => {
  const html = `
    <style>
      #icon-location {
        fill: black;
      }
      .hide {
        display: none;
      }
    </style>
    <svg class="hide">
      <symbol id="icon-location"><path d=""></path></symbol>
    </svg>
    <svg>
      <use href="#icon-location"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-location"></use>
    </svg>`

  const expected = `
    <style>
      #icon-location {
        fill: black;
      }
      .a {
        display: none;
      }
    </style>
    <svg class="a">
      <symbol id="icon-location"><path d=""></path></symbol>
    </svg>
    <svg>
      <use href="#icon-location"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-location"></use>
    </svg>`

  expect(
    await posthtml().use(plugin({ filter: /^#icon-/ })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('ignore ids', async () => {
  const html = `
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
      @media (min-width: 768px) {
        .header__intro {
          color: gray;
        }
        #another-id {
          visibility: hidden;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="icon-location"><path d=""></path></symbol>
      </svg>
      <h1 id="some-id">Title</h1>
      <p class="header__intro">OMG</p>
      <div class="card--profile">
        card content
      </div>
      <svg>
        <use xlink:href="#icon-location"></use>
      </svg>
      <label for="username">Click me</label>
      <input type="text" id="username">
    </body>
  </html>`

  const expected = `
  <html>
    <style>
      #some-id {
        text-transform: uppercase;
      }
      .a {
        color: blue;
      }
      .b {
        background: white;
      }
      @media (min-width: 768px) {
        .a {
          color: gray;
        }
        #another-id {
          visibility: hidden;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="icon-location"><path d=""></path></symbol>
      </svg>
      <h1 id="some-id">Title</h1>
      <p class="a">OMG</p>
      <div class="b">
        card content
      </div>
      <svg>
        <use xlink:href="#icon-location"></use>
      </svg>
      <label for="username">Click me</label>
      <input type="text" id="username">
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({ filter: /^.js-/, genNameId: false })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('ignore classes', async () => {
  const html = `
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
      @media (min-width: 768px) {
        .header__intro {
          color: gray;
        }
        #another-id {
          visibility: hidden;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="icon-location"><path d=""></path></symbol>
      </svg>
      <h1 id="some-id">Title</h1>
      <p class="header__intro">OMG</p>
      <div class="card--profile">
        card content
      </div>
      <svg>
        <use xlink:href="#icon-location"></use>
      </svg>
      <label for="username">Click me</label>
      <input type="text" id="username">
    </body>
  </html>`

  const expected = `
  <html>
    <style>
      #a {
        text-transform: uppercase;
      }
      .header__intro {
        color: blue;
      }
      .card--profile {
        background: white;
      }
      @media (min-width: 768px) {
        .header__intro {
          color: gray;
        }
        #b {
          visibility: hidden;
        }
      }
    </style>
    <body>
      <svg style="display:none">
        <symbol id="c"><path d=""></path></symbol>
      </svg>
      <h1 id="a">Title</h1>
      <p class="header__intro">OMG</p>
      <div class="card--profile">
        card content
      </div>
      <svg>
        <use xlink:href="#c"></use>
      </svg>
      <label for="d">Click me</label>
      <input type="text" id="d">
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({ filter: /^.js-/, genNameClass: false })).process(html).then(result => result.html)
  ).toBe(expected)
})

test('works with no options', async () => {
  const html = `
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
  </html>`

  const expected = `
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
  </html>`

  expect(
    await posthtml().use(plugin()).process(html).then(result => result.html)
  ).toBe(expected)
})

test('strips unnecessary whitespace when removing classes that do not match any in our CSS #8', async () => {
  const html = `
  <html>
    <style>
      .intro {
        color: blue;
      }
      .big {
        font-size: 600px;
      }
    </style>
    <body>
      <h1 class="intro non-existing-class big">Look!</h1>
    </body>
  </html>`

  const expected = `
  <html>
    <style>
      .a {
        color: blue;
      }
      .b {
        font-size: 600px;
      }
    </style>
    <body>
      <h1 class="a b">Look!</h1>
    </body>
  </html>`

  expect(
    await posthtml().use(plugin()).process(html).then(result => result.html)
  ).toBe(expected)
})

test('rewrites custom attribute names defined in `customAttributes` #36', async () => {
  const html = `
  <html>
    <style>
      .baz {
        color: blue;
      }
      .biz {
        color: green;
      }
      .buz {
        color: red;
      }
    </style>
    <body>
      <div 
        x-transition:enter="baz"
        x-transition:enter-start="biz"
        x-transition:enter-end="buz"
      >customAttributes</div>
    </body>
  </html>`

  const expected = `
  <html>
    <style>
      .a {
        color: blue;
      }
      .b {
        color: green;
      }
      .c {
        color: red;
      }
    </style>
    <body>
      <div x-transition:enter="a" x-transition:enter-start="b" x-transition:enter-end="buz">customAttributes</div>
    </body>
  </html>`

  expect(
    await posthtml().use(plugin({
      customAttributes: ['x-transition:enter', 'x-transition:enter-start']
    })).process(html).then(result => result.html)
  ).toBe(expected)
})

test(`don't remove classes that are not in our CSS`, async () => {
  const html = `<div id="foo" class="bar">baz</div>`

  const expected = `<div id="foo" class="bar">baz</div>`

  expect(
    await posthtml().use(plugin({removeUnfound: false})).process(html).then(result => result.html)
  ).toBe(expected)
})
