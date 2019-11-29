const passport = require('passport');
const config = require('../config/config');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { roles } = require('../middleware/roleAuth');

hashPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}
validatePassword = async(plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
exports.register = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            role: role
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({
            status: "true",
            message: "User created",
            user: newUser
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}
exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: 'fail',
                message: 'Please enter username and password'
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "Email not found"
            })
        }
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'));
        console.log(validPassword);
        const token = jwt.sign(user.toJSON(), config.SECRET_WORD);
        res.status(200).json({
            status: 'success',
            message: 'Login successfully',
            accesstoken: `jwt ${token}`
        })
        console.log(user);

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

exports.getAllUser = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}
exports.getUser = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}
exports.updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const content = req.body;
        const user = await User.findByIdAndUpdate(id, content, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}
exports.grantAccess = function(action, resource) {
    return async(req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
exports.allowIfLoggedin = async(req, res, next) => {
    try {
        const user = new User({
            role: "user"
        });
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        next(error);
    }
}