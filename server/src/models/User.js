const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'A user must have a username.']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'A user must have a email']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'A user must have a password']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});


userSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// userSchema.methods.comparePassword = function(passw, cb) {
//     bcrypt.compare(passw, this.password, function(err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('users', userSchema);