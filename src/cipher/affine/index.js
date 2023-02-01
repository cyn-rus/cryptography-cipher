const {onlyAlphabet} = require("../helper");
const helper = require('./helper');

exports.encrypt = (plaintext, key) => {
    plaintext = onlyAlphabet(plaintext);
    let keyDigits = key.split(" ");
    let keyM = parseInt(keyDigits[0]);
    let keyB = parseInt(keyDigits[1]);

    if (helper.gcd(keyM, 26) !== 1) {
        return "Invalid keys for cipher";
    }

    let encryptedResult = '';
    for (let i = 0; i < plaintext.length; ++i) {
        const encryptedNumber = (keyM * helper.wordToNumber(plaintext[i]) + keyB) % 26;

        encryptedResult = encryptedResult + helper.numberToWord(encryptedNumber).toUpperCase();
    }

    return encryptedResult;
}

exports.decrypt = (cipher, key) => {
    cipher = onlyAlphabet(cipher);
    let keyDigits = key.split(" ");
    let keyM = parseInt(keyDigits[0]);
    let keyB = parseInt(keyDigits[1]);

    if (helper.gcd(keyM, 26) !== 1) {
        return "Invalid keys for cipher";
    }

    let decryptedResult = '';
    for (let i = 0; i < cipher.length; ++i) {
        const decryptedNumber = (helper.inverse(keyM, 26) * (helper.wordToNumber(cipher[i]) - keyB + 26)) % 26;

        decryptedResult = decryptedResult + helper.numberToWord(decryptedNumber).toUpperCase();
    }

    return decryptedResult;
}