var passport = require('passport');
const config = require('../config/config');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const News = require('../models/News');
const Category = require('../models/Category');
const upload = require('../util/upload');
const multer = require('multer');
router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// GET by cat
router.get('/:id', function(req, res, next) {
    let catId = req.body.params;
    News.find({ Category: catId }, function(err, news) {
        if (err) return next(err);
        res.status(200).json(news);
    })
});

// GET by user 

// POST
router.post('/', function(req, res) {
    // Upload Image
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.log('A multer occurred when uploading.');
            res.json({ kq: 0, "err": err });
        } else if (err) {
            console.log('An unknown error occurred when uploading.' + err);
            res.json({ kq: 0, "err": err });
        } else {
            console.log('Upload is okay');
            console.log(req.file); // Thong tin file da upload
            // res.json({ kq: 1, "file:": req.file });

            News.create(req.body).then((news) => {
                    news.image = req.file.filename;
                    news.save();
                    res.json(news);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        msg: 'Something went wrong, please try again'
                    })
                })
        }
    })
});

router.post('/:catId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    let catId = req.params.catId;

    if (token) {
        Category.find(catId).then((category) => {
            if (!category) {
                return res.status(400).json({ success: false, msg: "There is no category with the given id our database" });
            }
            News.create(req.body).then((news) => {
                category.news_id.push(news._id);
                news.cat = category._id;
                category.save();
                res.json(news);
            })

        })
    } else {
        return res.status(401).send({ success: false, msg: 'Unauthorized' });
    }
});

// DELETE
router.delete('/:newsId', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        News.findByIdAndRemove(req.params.news_id, req.body, function(err, news) {
            if (err) return next(err);
            res.json(news);
        })
    } else {
        res.status(401).send({ success: false, msg: 'Unauthorized' });
    }
});
module.exports = router;