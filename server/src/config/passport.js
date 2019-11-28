var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/User');
var setting = require('./config');

module.exports = function(passport) {
    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = setting.SECRET_WORD;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}