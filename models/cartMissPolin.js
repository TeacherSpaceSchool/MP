var mongoose = require('mongoose');

const CartMissPolinSchema = mongoose.Schema({
    item: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: false
    },
    priceone: {
        type: String,
        required: false
    },
    pricefull: {
        type: String,
        required: false
    },
    count: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


var CartMissPolin = mongoose.model('CartMissPolin', CartMissPolinSchema);

module.exports = CartMissPolin;