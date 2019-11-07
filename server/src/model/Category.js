const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a type News'
    },
    News_id: [{
        type: mongoose.Types.ObjectId,
        ref: 'News' // ref xác định rõ model đang tham chiếu
    }],
    updated: { type: Date, default: Date.now }
});

var Category = mongoose.model('Categories', categorySchema);
module.exports = Category;