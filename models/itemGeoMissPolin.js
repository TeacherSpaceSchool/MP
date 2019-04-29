var mongoose = require('mongoose')

const ItemGeoMissPolinSchema = mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    geo: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


var ItemGeoMissPolin = mongoose.model('ItemGeoMissPolin', ItemGeoMissPolinSchema);

module.exports = ItemGeoMissPolin;