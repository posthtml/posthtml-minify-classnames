import test from 'ava';
import posthtml from 'posthtml';
import plugin from '../lib';

test('name gen', t => {
  const filter = /^.js-/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('emoji name gen', t => {
  const filter = /^.js-/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter, genNameClass: 'genNameEmoji', genNameId: 'genNameEmoji' })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('emoji string name gen', t => {
  const filter = /^.js-/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter, genNameClass: 'genNameEmojiString', genNameId: 'genNameEmojiString' })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('ignored pattern should not affect use#href', t => {
  const filter = /^#icon-|^.js/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('should work with xlink:href and href', t => {
const filter = /^#icon-/;
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
    </svg>
  `;
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
    </svg>
  `;
  return posthtml().use(plugin({ filter })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('ignore ids', t => {
  const filter = /^.js-/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter, genNameId: false })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('ignore classes', t => {
  const filter = /^.js-/;
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin({ filter, genNameClass: false })).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('works with no options', t => {
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
  </html>
  `;
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
  </html>
  `;
  return posthtml().use(plugin()).process(html)
    .then(result => {
      t.is(result.html, expected);
    });
});

test('strips unnecessary whitespaces when removing classes that do not match any in our CSS #8', t => {
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
  </html>
  `;

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
  </html>
  `;

  return posthtml().use(plugin()).process(html)
      .then(result => {
        t.is(result.html, expected);
      });
});
