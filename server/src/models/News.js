var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    cat: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        trim: true,
        required: 'A news must have a title'
    },
    description: String,
    price: String,
    area: Number,
    rent_object: String,
    image: String,
    creationDate: { type: Date, default: Date.now }
});
var News = mongoose.model('News', newsSchema);
module.exports = News;