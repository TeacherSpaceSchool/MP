var mongoose = require('mongoose');

const ColorMissPolinSchema = mongoose.Schema({
   title: {
        type: String,
        required: true,
    },
    RGB: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var ColorMissPolin = mongoose.model('ColorMissPolin', ColorMissPolinSchema);

module.exports = ColorMissPolin;