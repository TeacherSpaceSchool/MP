var mongoose = require('mongoose');

const ContactMissPolinSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var ContactMissPolin = mongoose.model('ContactMissPolin', ContactMissPolinSchema);

module.exports = ContactMissPolin;