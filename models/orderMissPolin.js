var mongoose = require('mongoose');

const OrderMissPolinSchema = mongoose.Schema({
    items: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
    },
    sum: {
        type: Number,
        required: true
    },
    kategory: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    geo: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


var OrderMissPolin = mongoose.model('OrderMissPolin', OrderMissPolinSchema);

module.exports = OrderMissPolin;