const CryptoJS = require('crypto-js');
const secretKey = process.env.JWT_SECRET;

exports.encrypt = (data) => CryptoJS.AES.encrypt(data, secretKey).toString();
exports.decrypt = (ciphertext) => CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8);
