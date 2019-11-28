require('dotenv').config();
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_LOCAL,
    SECRET_WORD: process.env.SECRET_WORD,
    CLOUDINARY_NAME: process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.API_KEY,
    CLOUDINARY_API_SECRET: process.env.API_SECRET,
    DEF_EXP_SHORT: "12days",
    DEF_EXP_LONG: "30 days"
};