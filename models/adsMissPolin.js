var mongoose = require('mongoose'),
    random = require('mongoose-random');

const AdsMissPolinSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    imageThumbnail: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

AdsMissPolinSchema.plugin(random, { path: 'r' });

var AdsMissPolin = mongoose.model('AdsMissPolin', AdsMissPolinSchema);

module.exports = AdsMissPolin;