const math = require('mathjs');
const { inverse } = require("../helper");

const generateKeyMatrix = (key) => {
    let mK = [[0,0,0],[0,0,0],[0,0,0]];
    let keyDigits = key.split(" ");
    let i = 0, j = 0, k = 0;

    while (i < 3 && k < keyDigits.length) {
        mK[i][j] = parseInt(keyDigits[k]);
        j++;

        if (j > 2) {
            j = 0;
            i++;
        }

        k++;
    }

    return mK;
}

const modMatrixInverse = (matrix, n) => {
    let determinant = math.det(matrix);

    determinant = Math.round(determinant);

    let invDet = inverse(determinant, n);
    let invMat = math.inv(matrix);

    invMat = math.multiply(determinant, invMat);
    invMat = math.round(invMat)
    invMat = math.multiply(invDet, invMat);
    invMat = math.mod(invMat, n);

    return invMat;
}

module.exports = {
    generateKeyMatrix,
    modMatrixInverse
}
