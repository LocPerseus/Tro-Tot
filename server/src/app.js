const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Global middleware
app.use(express.json({ limit: "2mb", extended: true }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(bodyParser.json());

// connect to db
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
//Ép Mongoose sử dụng thư viện promise toàn cục
// mongoose.Promise = global.Promise;
//Lấy kết nối mặc định
var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, "MongoDb connection error!"))
    .once('open', () => {
        console.log("Mongodb connected successfully!");
    })

// passport
const passport = require('passport');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const newsRoutes = require('./routes/news');
app.use(passport.initialize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/news', newsRoutes);

module.exports = app;