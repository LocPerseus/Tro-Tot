var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Category = require('../model/Category');

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// GET all
router.get('/', function(req, res) {
    Category.find(function(err, categories) {
        if (err) return next(err);
        res.json(categories);
    })

});
// router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
//     var token = req.headers['authorization'];
//     if (token) {
//         Category.find(function(err, categories) {
//             if (err) return next(err);
//             res.json(categories);
//         });
//     } else {
//         res.status(403).send({ success: false, msg: 'Unauthorized.' })
//     }
// });
// GET single
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        Category.findById(req.params.id, function(err, category) {
            if (err) return next(err);
            res.json(category);
        })

    } else {
        res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
});
// POST
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        Category.create(req.body, function(err, category) {
            if (err) return next(err);
            res.json(category);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized' })
    }
});
// Update
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        Category.findByIdAndUpdate(req.params.id, req.body, function(err, category) {
            if (err) return next(err);
            res.json(category);
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized' })
    }
});
// DELETE
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        Category.findByIdAndRemove(req.params.id, req.body, function(err, category) {
            if (err) return next(err);
            res.json(category);
        })
    } else {
        res.status(403).send({ success: false, msg: 'Unauthorized' })
    }
});
module.exports = router;