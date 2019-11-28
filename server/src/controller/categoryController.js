const Category = require('../models/Category');

// API
exports.getAllCategory = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        })
    }
}
module.exports.getCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        })
    }
}
exports.postCategory = async(req, res) => {
    try {
        const content = req.body;
        const category = await Category.create(content);
        res.status(201).json(category);
    } catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        })
    }
}
exports.updateCategory = async(req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const category = await Category.findByIdAndUpdate(id, content, {
            new: true,
            runValidators: true
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        })
    }
}
exports.deleteCategory = async(req, res) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndDelete(id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(404).json({
            success: 'fail',
            message: error
        })
    }
}