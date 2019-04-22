var mongoose = require('mongoose');

const KategoriaMissPolinSchema = mongoose.Schema({
    image: {
        type: String,
        required: false,
    },
    imageThumbnail: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        unique: true,
        required: false
    },
}, {
    timestamps: true
});

var KategoriaMissPolin = mongoose.model('KategoriaMissPolin', KategoriaMissPolinSchema);

module.exports = KategoriaMissPolin;