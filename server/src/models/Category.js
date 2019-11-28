const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'A category must have a name']
    },
    news_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'News' // ref xác định rõ model đang tham chiếu
    }],
    creationDate: { type: Date, default: Date.now }
});

var Category = mongoose.model('Categories', categorySchema);
module.exports = Category;