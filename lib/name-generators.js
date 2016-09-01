'use strict';

function* genName() {
  const DIGITS = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
  const filterPattern = /ad/;
  let i = 0;
  let num = 0;
  while (true) {
    let base = 36;
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

module.exports = {
  genName,
  genNameEmoji,
};
