const CRYPTO = require('crypto');

module.exports = {
    generateSaft: () => {
        return CRYPTO.randomBytes(128).toString('base64');
    },

    generateHashedPassword: (saft, password) => {
        return CRYPTO.createHmac('sha256', saft).update(password).digest('hex');
    }
}