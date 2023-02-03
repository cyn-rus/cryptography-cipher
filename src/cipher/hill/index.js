const helper = require('./helper');
const math = require("mathjs");
const {textToNumber, onlyAlphabet, numberToText} = require("../helper");

exports.encrypt = (plaintext, key) => {
    const mK = helper.generateKeyMatrix(key);

    if (!isNaN(helper.modMatrixInverse(mK, 28)[0][0])) {
        const plaintextNum = textToNumber(onlyAlphabet(plaintext));
        let mC, mP = [0, 0, 0];
        let encryptedResult = [];
        let i = 0;

        while (i < plaintextNum.length) {
            mP = plaintextNum.slice(i, i+3);

            while (mP.length < 3) {
                mP.push(-1);
            }

            mC = math.multiply(mK, mP);
            mC = math.round(mC);
            mC = math.mod(mC, 26);

            encryptedResult = encryptedResult.concat(mC);
            i+=3;
        }


        return numberToText(encryptedResult.slice(0, plaintext.length));
    } else {
        return "Invalid keys for cipher"
    }
}

exports.decrypt = (cipher, key) => {
    const mK = helper.generateKeyMatrix(key);
    const mKInv = helper.modMatrixInverse(mK, 26);

    if (!isNaN(mKInv[0][0])) {
        const cipherNum = textToNumber(onlyAlphabet(cipher));
        let mC, mP = [0, 0, 0];
        let decryptedResult = [];
        let i = 0;

        while (i < cipherNum.length) {
            mC = cipherNum.slice(i, i+3);

            while (mC.length < 3) {
                mC.push(26);
            }

            mP = math.multiply(mKInv, mC);
            mP = math.round(mP);
            mP = math.mod(mP, 26);

            decryptedResult = decryptedResult.concat(mP);
            i+=3;
        }

        return numberToText(decryptedResult.slice(0, cipher.length));
    } else {
        return "Invalid keys for cipher"
    }
}