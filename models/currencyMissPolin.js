var mongoose = require('mongoose');

const CurrencyMissPolinSchema = mongoose.Schema({
   title: {
        type: String,
        required: true,
       unique: true
   },
    value: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var CurrencyMissPolin = mongoose.model('CurrencyMissPolin', CurrencyMissPolinSchema);

module.exports = CurrencyMissPolin;