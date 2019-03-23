var mongoose = require('mongoose');

const FavoriteMissPolinSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var FavoriteMissPolin = mongoose.model('FavoriteMissPolin', FavoriteMissPolinSchema);

module.exports = FavoriteMissPolin;