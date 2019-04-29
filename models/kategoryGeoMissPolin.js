var mongoose = require('mongoose')

const KategoryGeoMissPolinSchema = mongoose.Schema({
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


var KategoryGeoMissPolin = mongoose.model('KategoryGeoMissPolin', KategoryGeoMissPolinSchema);

module.exports = KategoryGeoMissPolin;