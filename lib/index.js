'use strict';

const safeParser = require('postcss-safe-parser');
const selectorParser = require('postcss-selector-parser');
const nameGenerators = require('./name-generators');

class MinifyClassnames {
  constructor({genNameClass, genNameId, filter, customAttributes = [], removeUnfound = true} = {}) {
    this.filter = filter || /^.js-/;
    // TODO: Pass a seed for emojinamestring, make this better
    this.genNameClass = this.getNameGenerator(genNameClass, 7);
    this.genNameId = this.getNameGenerator(genNameId, 5);
    this.classMap = {};
    this.idMap = {};
    this.customAttributes = customAttributes;
    this.removeUnfound = removeUnfound;
  }

  getNameGenerator(value, seed) {
    if (value === false) {
      return false;
    }

    if (value) {
      return nameGenerators[value](seed);
    }

    return nameGenerators.genName(seed);
  }

  isClassFiltered(className) {
    if (this.genNameClass === false) {
      return true;
    }

    return this.filter.test(`.${className}`);
  }

  isIdFiltered(idName) {
    if (this.genNameId === false) {
      return true;
    }

    return this.filter.test(`#${idName}`);
  }

  process(tree) {
    return this.minifyElements(this.minifyStyles(tree));
  }

  minifyStyles(tree) {
    return tree.walk(node => {
      if (node.tag === 'style' && node.content) {
        const ast = safeParser(node.content.toString());
        this.walkRules(ast.nodes);
        node.content = [ast.toString()];
      }

      return node;
    });
  }

  minifyElements(tree) {
    return tree.walk(node => {
      if (node.attrs && this.customAttributes.length > 0) {
        const attributes = Object.keys(node.attrs);

        this.customAttributes
          .filter(attribute => attributes.includes(attribute))
          .forEach(attributes => {
            node.attrs[attributes] = node.attrs[attributes]
              .split(/\s+/)
              .map(value => {
              // NOTE: This removes classes that don't match any in our CSS
                if (this.isClassFiltered(value)) {
                  return value;
                }

                return this.classMap[value] || (this.removeUnfound ? '' : value);
              })
              .filter(Boolean)
              .join(' ')
              .trim();
          });
      }

      if (node.attrs && node.attrs.class) {
        let classes = node.attrs.class;
        node.attrs.class = classes
          .split(/\s+/)
          .map(value => {
            // NOTE: This removes classes that don't match any in our CSS
            if (this.isClassFiltered(value)) {
              return value;
            }

            return this.classMap[value] || (this.removeUnfound ? '' : value);
          })
          .filter(Boolean)
          .join(' ')
          .trim();
      }

      if (node.attrs && node.attrs.id) {
        let ids = node.attrs.id;
        node.attrs.id = ids
          .split(/\s+/)
          .map(value => {
            if (this.isIdFiltered(value)) {
              return value;
            }

            if (!this.idMap[value] && this.removeUnfound) {
              this.idMap[value] = this.genNameId.next().value;
            }

            return this.idMap[value] || (this.removeUnfound ? '' : value);
          })
          .join(' ');
      }

      if (node.attrs && node.attrs.for) {
        let htmlFor = node.attrs.for;
        if (!this.isIdFiltered(htmlFor)) {
          if (!this.idMap[htmlFor]) {
            this.idMap[htmlFor] = this.genNameId.next().value;
          }

          if (this.idMap[htmlFor]) {
            node.attrs.for = this.idMap[htmlFor];
          }
        }
      }

      if (
        node.tag === 'use' &&
        (node.attrs.href || node.attrs['xlink:href'])
      ) {
        const href = node.attrs.href ? 'href' : 'xlink:href';
        const id = node.attrs[href].slice(1);
        if (!this.isIdFiltered(id)) {
          if (this.idMap[id]) {
            node.attrs[href] = '#' + this.idMap[id];
          }
        }
      }

      return node;
    });
  }

  walkRules(nodes) {
    // TODO: nodes should be returned
    nodes.forEach(rule => {
      if (
        rule.type === 'atrule' &&
        (rule.name === 'media' || rule.name === 'supports')
      ) {
        this.walkRules(rule.nodes);
      } else if (rule.type === 'rule') {
        selectorParser(selectors => {
          selectors.walkClasses(classNode => {
            if (this.isClassFiltered(classNode.value)) {
              return;
            }

            if (!this.classMap[classNode.value]) {
              this.classMap[classNode.value] = this.genNameClass.next().value;
            }

            classNode.setPropertyWithoutEscape(
              'value',
              this.classMap[classNode.value]
            );
          });

          selectors.walkIds(idNode => {
            if (this.isIdFiltered(idNode.value)) {
              return;
            }

            if (!this.idMap[idNode.value]) {
              this.idMap[idNode.value] = this.genNameId.next().value;
            }

            idNode.value = this.idMap[idNode.value];
          });
          rule.selector = selectors.toString();
        }).process(rule.selector);
      }
    });
  }
}

module.exports = options => tree => new MinifyClassnames(options).process(tree);
