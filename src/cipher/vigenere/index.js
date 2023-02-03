const { onlyAlphabet, textToNumber, numberToText, encryptText, decryptText } = require("../helper")

exports.encrypt = (plaintext, key) => {
  const plaintextNum = textToNumber(onlyAlphabet(plaintext))
  const keyNum = textToNumber(onlyAlphabet(key))
 
  const output = encryptText(plaintextNum, keyNum)
  
  return numberToText(output)
}

exports.decrypt = (cipher, key) => {
  const cipherNum = textToNumber(cipher)
  const keyNum = textToNumber(key)

  const output = decryptText(cipherNum, keyNum)

  return numberToText(output).toLowerCase()
}