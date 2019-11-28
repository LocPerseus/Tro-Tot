var mongoose = require('mongoose');
const ENCRYTION = require('../util/encryption');
const USER = require('../models/User');
var rolesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
})
const ROLE = mongoose.model('Role', rolesSchema);
module.exports = Roles;

module.exports.init = () => {
    ROLE.find({ name: 'Admin' }).then((role) => {
        if (!role) {
            ROLE.create({ name: 'Admin' }).then((newRole) => {
                let saft = ENCRYTION.generateSaft();
                let passwordHash = ENCRYTION.generateHashedPassword(saft, 'Admin');
                let adminUser = {
                    username: 'admin',
                    password: passwordHash,
                    saft: saft,
                    isAdmin: true,
                    roles: [newRole._id]
                };
                USER.create(adminUser).then((user) => {
                    newRole.users.push(user._id);
                    newRole.save();
                })
            });


        }
    })
}