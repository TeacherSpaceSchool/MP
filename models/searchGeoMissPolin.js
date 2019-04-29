var mongoose = require('mongoose')

const SearchGeoMissPolinSchema = mongoose.Schema({
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


var SearchGeoMissPolin = mongoose.model('SearchGeoMissPolin', SearchGeoMissPolinSchema);

module.exports = SearchGeoMissPolin;