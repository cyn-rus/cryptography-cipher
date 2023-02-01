const gcd = (a, b) => {
    return (b === 0 ? a : gcd(b, a % b));
}

const multiply = (a, b, mod) => {
    return (a * b) % mod;
}

const inverse = (a, mod) => {
    a = a % mod;
    for (let i = 1; i < mod; ++i) {
        if (multiply(a, i, mod) === 1) {
            return i;
        }
    }
    return -1;
}

const wordToNumber = (word) => {
    if (word >= 'A' && word <= 'Z') {
        return word.charCodeAt(0) - 'A'.charCodeAt(0);
    } else if (word >= 'a' && word <= 'z') {
        return word.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

const numberToWord = (num) => {
    return String.fromCharCode('a'.charCodeAt(0) + num);
}

module.exports = {
    gcd,
    multiply,
    inverse,
    wordToNumber,
    numberToWord
}