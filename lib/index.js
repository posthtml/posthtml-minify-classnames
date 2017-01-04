'use strict';

const safeParser = require('postcss-safe-parser');
const selectorParser = require('postcss-selector-parser');
const nameGenerators = require('./name-generators');

class MinifyClassnames {
  constructor(options) {
    options = options || {};
    this.filter = options.filter || /^.js-/;
    // TODO: Pass a seed for emojinamestring, make this better
    this.genNameClass = nameGenerators[options.genNameClass || 'genName'](7);
    this.genNameId = nameGenerators[options.genNameId || 'genName'](5);
    this.classMap = {};
    this.idMap = {};
  };
  isFiltered(type, value) {
    if (type === 'class') {
      value = `.${value}`;
    } else if (type === 'id') {
      value = `#${value}`;
    }
    return Boolean(value.match(this.filter));
  };
  process(tree) {
    tree = this.minifyStyles(tree);
    tree = this.minifyElements(tree);
    return tree;
  };
  minifyStyles(tree) {
    return tree.walk(node => {
      if (node.tag === 'style' && node.content) {
        const ast = safeParser(node.content.toString());
        this.walkRules(ast.nodes);
        node.content = ast.toString();
      }
      return node;
    });
  };
  minifyElements(tree) {
    return tree.walk(node => {
      if (node.attrs) {
        if (node.attrs.class) {
          let classes = node.attrs.class;
          node.attrs.class = classes.split(/\s+/).map(value => {
            // NOTE: This removes classes that don't match any in our CSS
            if (this.isFiltered('class', value)) {
              return value;
            } else {
              return this.classMap[value] || '';
            }
          }).join(' ');
        }
        if (node.attrs.id) {
          let ids = node.attrs.id;
          node.attrs.id = ids.split(/\s+/).map(value => {
            if (this.isFiltered('id', value)) {
              return value;
            } else {
              if (!this.idMap[value]) {
                this.idMap[value] = this.genNameId.next().value;
              }
              return this.idMap[value];
            }
          }).join(' ');
        }
        if (node.attrs.for) {
          let value = node.attrs.for;
          if (!this.isFiltered('id', value)) {
            if (!this.idMap[value]) {
              this.idMap[value] = this.genNameId.next().value;
            }
            node.attrs.for = this.idMap[value] || node.attrs.for;
          }
        }
        if (node.attrs['xlink:href']) {
          node.attrs['xlink:href'] = '#' + this.idMap[node.attrs['xlink:href'].substring(1)];
        }
      }
      return node;
    });
  };
  walkRules(nodes) {
    // TODO: nodes should be returned
    nodes.forEach(rule => {
      if (rule.type === 'atrule' && (rule.name === 'media' || rule.name === 'supports')) {
        this.walkRules(rule.nodes);
      } else if (rule.type === 'rule') {
        selectorParser(selectors => {
          selectors.walkClasses(selector => {
            if (this.isFiltered('class', selector.value)) {
              return;
            }
            if (!this.classMap[selector.value]) {
              this.classMap[selector.value] = this.genNameClass.next().value;
            }
            selector.value = this.classMap[selector.value];
          });
          selectors.walkIds(selector => {
            if (this.isFiltered('id', selector.value)) {
              return;
            }
            if (!this.idMap[selector.value]) {
              this.idMap[selector.value] = this.genNameId.next().value;
            }
            selector.value = this.idMap[selector.value];
          });
          rule.selector = selectors.toString();
        })
        .process(rule.selector);
      }
    });
  };
}

module.exports = options => tree => new MinifyClassnames(options).process(tree);
