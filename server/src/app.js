const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const bodyParser = require('body-parser');


//Global middleware
app.use(express.json({ limit: "2mb", extended: true }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(bodyParser.json());

// connect to db
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, "MongoDb connection error!"))
    .once('open', () => {
        console.log("Mongodb connected successfully!");
    })


app.get("/", (req, res) => {
    res.send('ok');
});

// passport
const passport = require('passport');
const auth = require('./routes/auth');
// const news = require('./routes/news');
const category = require('./routes/category');
app.use(passport.initialize());

app.use('/api/auth', auth);
// app.use('/api/news', news);
app.use('/api/category', category);
// api
// category
/*
var Category = require('./model/Category').default;

app.get('/api/category', function(req, res) {
    Category.find({ approved: true }, function(err, categories) {
        if (err) return res.status(500).send('Error occured: database error.');
        res.json(categories.map(function(c) {
            return {
                name: c.name,
                News_id: c.News_id
            }
        }));
    })
})
app.get('/api/category/:id', function(req, res) {

})
app.post('/api/category', function(req, res) {
    var categories = new Category({
        name: req.body.name,
        approved: false
    });
    categories.save(function(err, c) {
        if (err) return res.send(500, 'Error occured: database error.');
        else {
            res.json(categories);
        }
    });


})
app.put('/api/category/:id', function(req, res) {

})
app.delete('/api/category/:id', function(req, res) {

})

// news
var News = require('./model/News');
app.get('/api/news', function(req, res) {
    Category.find({ approved: true }, function(err, categories) {
        if (err) return res.status(500).send('Error occured: database error.');
        else {
            res.json(categories);
        }
    })
})
app.get('/api/news/:id', function(req, res) {

})
app.post('/api/news', function(req, res) {
    var news = new News({
        name: req.body.name,
        approved: false
    });
    news.save(function(err, c) {
        if (err) return res.send(500, 'Error occured: database error.');
        else {
            res.json(news);
        }
    });


})
app.put('/api/news/:id', function(req, res) {

})
app.delete('/api/news/:id', function(req, res) {

})
*/

module.exports = app;