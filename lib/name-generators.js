'use strict';

var emojiList = require('./emoji-list-compiled.js');
function* genName() {
  const DIGITS = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
  const filterPattern = /^(\d|--|-\d)/;
  let i = 0;
  let num = 0;
  while (true) {
    let base = 26;
    let name = '';
    do {
      name += DIGITS.charAt(num % base);
      num = Math.floor(num / base);
      base = 38;
    } while (num > 0);
    if (!name.match(filterPattern)) {
      yield name;
    }
    i++;
    num = i;
  }
}

function* genNameEmoji() {
  let start = 128512;
  let base = 128591 - start;
  let i = 0;
  let num = 0;
  while (true) {
    let name = '';
    do {
      name += String.fromCodePoint(start + num % base);
      num = Math.floor(num / base);
    } while (num > 0);
    yield name;
    i++;
    num = i;
  }
}

function* parkMiller(seed) {
  var prime = 2147483647;
  var state = (seed || ~~(Math.random() * 2147483645) + 1) % prime || 1;

  while (true) {
    state = (state * 48271) % prime;
    yield state;
  }
}

function* genNameEmojiString(seed) {
  var rand = parkMiller(seed);
  var nameList = [];
  while (true) {
    let newName = '' + emojiList[rand.next().value % emojiList.length] + emojiList[rand.next().value % emojiList.length] + emojiList[rand.next().value % emojiList.length];
    // Simple check to make sure we don't generate the same name twice.
    if (nameList.indexOf(newName) !== -1) continue;
    nameList.push(newName);
    yield newName;
  }
}

module.exports = {
  genName,
  genNameEmoji,
  genNameEmojiString,
};
