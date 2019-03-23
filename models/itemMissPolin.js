var mongoose = require('mongoose');
var random = require('mongoose-random');

const ItemMissPolinSchema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    imageThumbnail: {
        type: String,
        required: false,
    },
    art: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    line: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: false
    },
    count: {
        type: String,
        required: false
    },
    kategoria: {
        type: String,
        required: false
    },
    podkategoria: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: false
    },
    keyword: {
        type: String,
        required: false
    },
    discount: {
        type: String,
        required: false
    },
    cod: {
        type: String,
        required: false
    }
}, {
    timestamps: false
});

ItemMissPolinSchema.plugin(random, { path: 'r' });

var ItemMissPolin = mongoose.model('ItemMissPolin', ItemMissPolinSchema);

module.exports = ItemMissPolin;