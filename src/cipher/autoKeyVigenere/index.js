const { textToNumber, onlyAlphabet, numberToText, encryptText, decryptAlphabet } = require("../helper")

exports.encrypt = (plaintext, key) => {
  const plaintextNum = textToNumber(onlyAlphabet(plaintext))
  const keyNum = textToNumber(key)
  
  const plaintextLen = plaintextNum.length
  const keyLen = key.length

  for (let i = keyLen; i !== plaintextLen; i++) {
    keyNum.push(plaintextNum[i - keyLen])
  }

  const output = encryptText(plaintextNum, keyNum)

  return numberToText(output)
}

exports.decrypt = (cipher, key) => {
  const cipherNum = textToNumber(onlyAlphabet(cipher))
  const keyNum = textToNumber(key)

  const cipherLen = cipherNum.length

  const output = []
  for (let i = 0; i < cipherLen; i++) {
    const decrypted = decryptAlphabet(cipherNum[i], keyNum[i])
    output.push(decrypted)
    keyNum.push(decrypted)
  }

  return numberToText(output).toLowerCase()
}