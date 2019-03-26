var mongoose = require('mongoose')

const ReferMissPolinSchema = mongoose.Schema({
    refer: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


var ReferMissPolin = mongoose.model('ReferMissPolin', ReferMissPolinSchema);

module.exports = ReferMissPolin;