var mongoose = require('mongoose')

const GeoStatisticMissPolinSchema = mongoose.Schema({
    geo: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var GeoStatisticMissPolin = mongoose.model('GeoStatisticMissPolin', GeoStatisticMissPolinSchema);

module.exports = GeoStatisticMissPolin;