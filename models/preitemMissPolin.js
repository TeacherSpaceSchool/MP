var mongoose = require('mongoose');

const PreitemMissPolinSchema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    imageThumbnail: {
        type: String,
        required: false,
    },
    art: {
        type: String,
        required: false,
        unique: true
    },
    prices: {
        type: String,
        required: false
    },
    line: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


var PreitemMissPolin = mongoose.model('PreitemMissPolin', PreitemMissPolinSchema);

module.exports = PreitemMissPolin;