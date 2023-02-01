const { textToAscii, encryptAsciiText, decryptAsciiText, asciiToText, encryptAscii, decryptAscii } = require("../helper")

exports.encrypt = (plaintext, key) => {
  const plaintextNum = textToAscii(plaintext)
  const keyNum = textToAscii(key)

  const output = encryptAsciiText(plaintextNum, keyNum)

  return asciiToText(output)
}

exports.decrypt = (cipher, key) => {
  const cipherNum = textToAscii(cipher)
  const keyNum = textToAscii(key)

  const output = decryptAsciiText(cipherNum, keyNum)

  return asciiToText(output).toLowerCase()
}