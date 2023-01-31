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

exports.numberToText = (num, length) => {
  let text = ""
  let i = 0
  for (const n of num) {
    text += String.fromCharCode(n + 65)
    i++

    if (i === length) {
      i = 0
      text += " "
    } 
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