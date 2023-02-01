exports.onlyAlphabet = (text) => {
  return text.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, '').replace(/[0-9]/g, '')
}

exports.textToNumber = (text) => {
  const num = []
  for (const char of text) {
    num.push(char.toLowerCase().charCodeAt() - 97)
  }

  return num
}

exports.numberToText = (num) => {
  let text = ""
  for (const n of num) {
    text += String.fromCharCode(n + 65)
  }
  
  return text
}

exports.textToAscii = (text) => {
  const ascii = []
  for (const char of text) {
    ascii.push(char.charCodeAt())
  }

  return ascii
}

exports.asciiToText = (ascii) => {
  let text = ""
  for (const a of ascii) {
    text += String.fromCharCode(a)
  }

  return text
}

exports.encryptAlphabet = (p, k) => {
  return (p + k) % 26
}

exports.decryptAlphabet = (c, k) => {
  return ((c + 26) - k) % 26
}

exports.encryptAscii = (p, k) => {
  return (p + k) % 256
}

exports.decryptAscii = (c, k) => {
  return ((c + 256) - k) % 256
}

const encDec = (text, key, func) => {
  const output = []

  let i = 0
  for (const char of text) {
    output.push(func(char, key[i]))
    i = (i + 1) % key.length
  }

  return output
}

exports.encryptText = (text, key) => {
  return encDec(text, key, this.encryptAlphabet)
}

exports.decryptText = (cipher, key) => {
  return encDec(cipher, key, this.decryptAlphabet)
}

exports.encryptAsciiText = (text, key) => {
  return encDec(text, key, this.encryptAscii)
}

exports.decryptAsciiText = (cipher, key) => {
  return encDec(cipher, key, this.decryptAscii)
}

exports.gcd = (a, b) => {
  return (b === 0 ? a : this.gcd(b, a % b));
}

const multiply = (a, b, mod) => {
  return (a * b) % mod;
}

exports.modInverse = (a, mod) => {
  a = a % mod;
  for (let i = 1; i < mod; ++i) {
    if (multiply(a, i, mod) === 1) {
      return i;
    }
  }
  return -1;
}