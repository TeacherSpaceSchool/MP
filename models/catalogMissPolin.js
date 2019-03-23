var mongoose = require('mongoose');

const CatalogMissPolinSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var CatalogMissPolin = mongoose.model('CatalogMissPolin', CatalogMissPolinSchema);

module.exports = CatalogMissPolin;