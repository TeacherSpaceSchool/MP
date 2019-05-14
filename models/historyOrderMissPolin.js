var mongoose = require('mongoose');

const HistoryMissPolinSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true
    },
    get: {
        type: String
    }
}, {
    timestamps: true
});


var HistoryMissPolin = mongoose.model('HistoryMissPolin', HistoryMissPolinSchema);

module.exports = HistoryMissPolin;