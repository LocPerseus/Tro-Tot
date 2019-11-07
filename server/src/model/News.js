const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Please enter name'
    },
    description: String,
    price: String,
    area: Number,
    rent_object: String,
    image: String
});
var News = mongoose.model('News', newsSchema);
module.exports = News;