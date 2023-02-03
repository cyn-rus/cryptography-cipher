const {numberToText, textToNumber, onlyAlphabet} = require("../helper");
const helper = require("./helper");

exports.encrypt = (plaintext, key) => {
    const bigramArray = helper.generateBigram(textToNumber(onlyAlphabet(plaintext)));
    const keyMatrix = helper.generateKeyMatrix(textToNumber(key));
    const encryptedResult = [];

    for (let i = 0; i < bigramArray.length; i++) {
        let bigramElmt = [];
        let locationA = helper.findElementInMatrix(bigramArray[i][0], keyMatrix);
        let locationB = helper.findElementInMatrix(bigramArray[i][1], keyMatrix);

        if (locationA[0] === locationB[0]) {
            bigramElmt = [
                keyMatrix[locationA[0]][(locationA[1] + 1) % 5],
                keyMatrix[locationA[0]][(locationB[1] + 1) % 5],
            ];
        } else if (locationA[1] === locationB[1]) {
            bigramElmt = [
                keyMatrix[(locationA[0] + 1) % 5][locationA[1]],
                keyMatrix[(locationB[0] + 1) % 5][locationA[1]],
            ];
        } else {
            bigramElmt = [
                keyMatrix[locationA[0]][locationB[1]],
                keyMatrix[locationB[0]][locationA[1]],
            ];
        }

        encryptedResult.push(bigramElmt[0]);
        encryptedResult.push(bigramElmt[1]);
    }

    return numberToText(encryptedResult);
}

exports.decrypt = (cipher, key) => {
    const bigramArray = helper.generateBigram(textToNumber(cipher));
    const keyMatrix = helper.generateKeyMatrix(textToNumber(key));
    const decryptedResult = [];

    for (let i = 0; i < bigramArray.length; i++) {
        let bigramElmt = [];
        let locationA = helper.findElementInMatrix(bigramArray[i][0], keyMatrix);
        let locationB = helper.findElementInMatrix(bigramArray[i][1], keyMatrix);

        if (locationA[0] === locationB[0]) {
            bigramElmt = [
                keyMatrix[locationA[0]][(locationA[1] + 4) % 5],
                keyMatrix[locationA[0]][(locationB[1] + 4) % 5],
            ];
        } else if (locationA[1] === locationB[1]) {
            bigramElmt = [
                keyMatrix[(locationA[0] + 4) % 5][locationA[1]],
                keyMatrix[(locationB[0] + 4) % 5][locationA[1]],
            ];
        } else {
            bigramElmt = [
                keyMatrix[locationA[0]][locationB[1]],
                keyMatrix[locationB[0]][locationA[1]],
            ];
        }

        decryptedResult.push(bigramElmt[0]);
        decryptedResult.push(bigramElmt[1]);
    }

    return numberToText(decryptedResult);
}