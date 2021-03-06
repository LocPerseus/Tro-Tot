const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/config');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// GET all
router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(categoryController.postCategory);
router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);
// router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.find(function(err, categories) {
//             if (err) return next(err);
//             res.json(categories);
//         });
//     } else {
//         res.status(401).send({ success: false, msg: 'Unauthorized.' })
//     }
// });
// GET single
// router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.findById(req.params.id, function(err, category) {
//             if (err) return next(err);
//             res.json(category);
//         })

//     } else {
//         res.status(401).send({ success: false, msg: 'Unauthorized.' })
//     }
// });
// // POST
// router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.create(req.body, function(err, category) {
//             if (err) return next(err);
//             res.json(category);
//         });
//     } else {
//         return res.status(401).send({ success: false, msg: 'Unauthorized' })
//     }
// });
// // Update
// router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.findByIdAndUpdate(req.params.id, req.body, function(err, category) {
//             if (err) return next(err);
//             res.json(category);
//         })
//     } else {
//         return res.status(401).send({ success: false, msg: 'Unauthorized' })
//     }
// });
// // DELETE
// router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.findByIdAndRemove(req.params.id, req.body, function(err, category) {
//             if (err) return next(err);
//             res.json(category);
//         })
//     } else {
//         res.status(401).send({ success: false, msg: 'Unauthorized' })
//     }
// });
module.exports = router;