const mongoose = require('mongoose');

const StaticMissPolinSchema = mongoose.Schema({
    catalog: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

const StaticMissPolin = mongoose.model('StaticMissPolin', StaticMissPolinSchema);

module.exports = StaticMissPolin;