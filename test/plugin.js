'use strict';
import test from 'ava';
// import { MinifyClassnames } from './index';
// const test = require('ava');
const posthtml = require('posthtml');
const plugin = require('../lib');

test('foo', t => {
  t.pass();
});

test('classes are transformed', t => {
  const filter = /^js-/;
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
    </style>
    <body>
      <h1 id="some-id">Title</h1>
      <p class="header__intro">OMG</p>
      <div class="card--profile">
        card content
      </div>
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
    </style>
    <body>
      <h1 id="a">Title</h1>
      <p class="a">OMG</p>
      <div class="b">
        card content
      </div>
    </body>
  </html>
  `;
  return posthtml().use(plugin({ filter })).process(html)
    .then(result => {
      t.is(result.html, expected, 'test is sucessful');
    });
});
