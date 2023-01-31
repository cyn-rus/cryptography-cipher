const { textToNumber, numberToText, encryptAlphabet, decryptAlphabet } = require("../helper")

exports.encrypt = (plaintext, key) => {
  plaintext = plaintext.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, '')
  const plaintextNum = textToNumber(plaintext)
  const keyNum = textToNumber(key)
 
  const output = []
  let i = 0
  for (const char of plaintextNum) {
    output.push(encryptAlphabet(char, keyNum[i])) 
    i = (i + 1) % keyNum.length
  }
  
  return numberToText(output, 0)
}

exports.decrypt = (cipher, key) => {
  const cipherNum = textToNumber(cipher)
  const keyNum = textToNumber(key)

  const output = []
  let i = 0
  for (const char of cipherNum) {
    output.push(decryptAlphabet(char, keyNum[i]))
    i = (i + 1) % keyNum.length
  }

  return numberToText(output, 0).toLowerCase()
}