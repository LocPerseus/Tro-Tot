const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    numberphone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('profile', userSchema);