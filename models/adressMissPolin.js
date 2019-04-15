var mongoose = require('mongoose');

const AdressMissPolinSchema = mongoose.Schema({
    email: {
        type: String,
    },
    user: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    room: {
        type: String,
    },
    index: {
        type: String,
    },
}, {
    timestamps: true
});


var AdressMissPolin = mongoose.model('AdressMissPolin', AdressMissPolinSchema);

module.exports = AdressMissPolin;