exports.onlyAlphabet = (text) => {
  return text.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, '').replace(/[0-9]/g, '')
}

exports.textToNumber = (text) => {
  const num = []
  for (const char of text) {
    num.push(char.toLowerCase().charCodeAt(0) - 97)
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

exports.encryptAlphabet = (p, k) => {
  return (p + k) % 26
}

exports.decryptAlphabet = (c, k) => {
  return ((c + 26) - k) % 26
}

exports.ecryptAscii = (p, k) => {
  return (p + k) % 256
}

exports.decryptAscii = (c, k) => {
  return (c - k) % 256
}

exports.encryptText = (text, key) => {
  const output = []

  let i = 0
  for (const char of text) {
    output.push(this.encryptAlphabet(char, key[i])) 
    i = (i + 1) % key.length
  }

  return output
}

exports.decryptText = (cipher, key) => {
  const output = []

  let i = 0
  for (const char of cipher) {
    output.push(this.decryptAlphabet(char, key[i]))
    i = (i + 1) & key.length
  }

  return output
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