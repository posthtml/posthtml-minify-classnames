# Basic simple example

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
      <use href="#icon-location"></use>
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
      <use href="#b"></use>
    </svg>
    <label for="c">Click me</label>
    <input type="text" id="c">
  </body>
</html>
```
