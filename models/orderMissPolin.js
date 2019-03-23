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
    typePay: {
        type: String,
        required: true
    },
    adress: mongoose.Schema.Types.Mixed,
    status: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


var OrderMissPolin = mongoose.model('OrderMissPolin', OrderMissPolinSchema);

module.exports = OrderMissPolin;