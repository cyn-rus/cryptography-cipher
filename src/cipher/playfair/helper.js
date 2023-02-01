import {textToNumber} from "../helper";

const CODE_I = 8;
const CODE_J = 9;
const CODE_X = 23;

const generateKeyMatrix = (key) => {
    const keyArray = [];

    for (let i = 0; i < key.length; i++) {
        if (!keyArray.includes(key[i]) && key[i] !== CODE_J) keyArray.push(key[i]);
    }

    const alphabet = textToNumber("abcdefghiklmnopqrstuvwxyz");
    for (let i = 0; i < alphabet.length; i++) {
        if (!keyArray.includes(alphabet[i])) keyArray.push(alphabet[i]);
    }

    const keyMatrix = [];
    for (let i = 0; i < 5; i++) {
        keyMatrix[i] = keyArray.splice(0, 5);
    }
    return keyMatrix;
};

const generateBigram = (textNumArray) => {
    for (let i = 0; i < textNumArray.length; i++) {
        if (textNumArray[i] === CODE_J) {
            textNumArray[i] = CODE_I;
        }
    }

    const bigramArray = [];
    let i = 0;
    while (i < textNumArray.length) {
        if (i === textNumArray.length-1){
            bigramArray.push([textNumArray[i], CODE_X]);
            i++;
        } else {
            if (textNumArray[i] !== textNumArray[i + 1]) {
                bigramArray.push([textNumArray[i], textNumArray[i + 1]]);
                i += 2;
            } else {
                bigramArray.push([textNumArray[i], CODE_X]);
                i++;
            }
        }
    }

    return bigramArray;
};

const findElementInMatrix = (element, matrix) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === element) {
                return [i, j];
            }
        }
    }
};

module.exports = {
    generateKeyMatrix,
    generateBigram,
    findElementInMatrix
}