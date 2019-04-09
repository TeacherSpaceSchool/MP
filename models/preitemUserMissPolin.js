var mongoose = require('mongoose');

const PreitemUserMissPolinSchema = mongoose.Schema({
    preitem: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: false
    },
}, {
    timestamps: false
});

var PreitemUserMissPolin = mongoose.model('PreitemUserMissPolin', PreitemUserMissPolinSchema);

module.exports = PreitemUserMissPolin;