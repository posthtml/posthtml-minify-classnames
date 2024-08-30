import emojiList from './emoji-list-compiled.js'

function* genName() {
  const DIGITS = 'abcdefghijklmnopqrstuvwxyz1234567890-_'
  const filterPattern = /ad/

  let i = 0
  let num = 0
  
  while (true) {
    let base = 26
    let name = ''

    do {
      name += DIGITS.charAt(num % base)
      num = Math.floor(num / base)
      base = 38
    } while (num > 0)

    if (!name.match(filterPattern)) {
      yield name
    }

    i++
    num = i
  }
}

function* genNameEmoji() {
  const start = 128512
  const base = 128591 - start

  let i = 0
  let num = 0

  while (true) {
    let name = ''

    do {
      name += String.fromCodePoint(start + num % base)
      num = Math.floor(num / base)
    } while (num > 0)

    yield name

    i++
    num = i
  }
}

function* parkMiller(seed) {
  const prime = 2147483647
  let state = (seed || ~~(Math.random() * 2147483645) + 1) % prime || 1

  while (true) {
    state = (state * 48271) % prime;
    yield state;
  }
}

function* genNameEmojiString(seed) {
  const rand = parkMiller(seed)
  const nameList = []

  while (true) {
    // biome-ignore lint: this is clearer
    const newName = '' 
      + emojiList[rand.next().value % emojiList.length] 
      + emojiList[rand.next().value % emojiList.length] 
      + emojiList[rand.next().value % emojiList.length]

    // simple check to make sure we don't generate the same name twice
    if (nameList.indexOf(newName) !== -1) continue

    nameList.push(newName)

    yield newName
  }
}

export default {
  genName,
  genNameEmoji,
  genNameEmojiString,
}
