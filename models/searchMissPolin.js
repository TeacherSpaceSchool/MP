var mongoose = require('mongoose')

const SearchMissPolinSchema = mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var SearchMissPolin = mongoose.model('SearchMissPolin', SearchMissPolinSchema);

module.exports = SearchMissPolin;