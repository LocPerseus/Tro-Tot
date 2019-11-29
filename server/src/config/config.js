require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_LOCAL,
    SECRET_WORD: process.env.SECRET_WORD,
};