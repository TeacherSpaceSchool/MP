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
    name: {
        type: String,
        required: false
    },
    price: {
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
    timestamps: false
});


var PreitemMissPolin = mongoose.model('PreitemMissPolin', PreitemMissPolinSchema);

module.exports = PreitemMissPolin;