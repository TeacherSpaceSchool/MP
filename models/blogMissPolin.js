var mongoose = require('mongoose');

const BlogMissPolinSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    imageThumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var BlogMissPolin = mongoose.model('BlogMissPolin', BlogMissPolinSchema);

module.exports = BlogMissPolin;