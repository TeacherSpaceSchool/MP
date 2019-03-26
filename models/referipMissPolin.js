var mongoose = require('mongoose')

const ReferipMissPolinSchema = mongoose.Schema({
    refer: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var ReferipMissPolin = mongoose.model('ReferipMissPolin', ReferipMissPolinSchema);

module.exports = ReferipMissPolin;