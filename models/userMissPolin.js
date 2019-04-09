var mongoose = require('mongoose');
const crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');

const UserMissPolinSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: String,
    role: String,
    status: String,
    data: String,
    passwordHash: String,
    salt: String,
    ref: String,
    lvl: String,
}, {
    timestamps: true
});

UserMissPolinSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

UserMissPolinSchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

UserMissPolinSchema.plugin(uniqueValidator);

var UserMissPolin = mongoose.model('UserMissPolin', UserMissPolinSchema);

module.exports = UserMissPolin;