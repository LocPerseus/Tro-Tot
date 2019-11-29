const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Global middleware
app.use(express.json({ limit: "2mb", extended: true }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(bodyParser.json());

// passport
const passport = require('passport');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/userRoutes');
app.use(passport.initialize());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/users', userRoutes);
module.exports = app;