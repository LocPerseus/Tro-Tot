const passport = require('passport');
const config = require('../config/config');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const userController = require('../controllers/userController');

router
    .route('/register')
    .post(userController.register);
// Router Login
router
    .route('/login')
    .post(userController.login);
// Logout User
router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    req.logOut();
    res.json({ success: true })
});
router
    .route('/:id')
    .patch(userController.updateUser);
module.exports = router;