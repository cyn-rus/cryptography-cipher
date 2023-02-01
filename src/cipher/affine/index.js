const { onlyAlphabet, textToNumber, numberToText, gcd, modInverse } = require("../helper");

exports.encrypt = (plaintext, key) => {
    const plaintextNum = textToNumber(onlyAlphabet(plaintext));
    const keyDigits = key.split(" ");
    const keyM = parseInt(keyDigits[0]);
    const keyB = parseInt(keyDigits[1]);

    if (gcd(keyM, 26) !== 1) {
        return "Invalid keys for cipher";
    }

    let encryptedResult = [];
    for (let i = 0; i < plaintextNum.length; ++i) {
        const encryptedNumber = (keyM * plaintextNum[i] + keyB) % 26;

        encryptedResult.push(encryptedNumber);
    }

    return numberToText(encryptedResult);
}

exports.decrypt = (cipher, key) => {
    const cipherNum = textToNumber(onlyAlphabet(cipher));
    const keyDigits = key.split(" ");
    const keyM = parseInt(keyDigits[0]);
    const keyB = parseInt(keyDigits[1]);

    if (gcd(keyM, 26) !== 1) {
        return "Invalid keys for cipher";
    }

    let decryptedResult = [];
    for (let i = 0; i < cipher.length; ++i) {
        const decryptedNumber = (modInverse(keyM, 26) * (cipherNum[i] - keyB + 26)) % 26;

        decryptedResult.push(decryptedNumber);
    }

    return numberToText(decryptedResult);
}