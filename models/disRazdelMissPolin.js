var mongoose = require('mongoose')

const DisRazdelMissPolinSchema = mongoose.Schema({
    discount: {
        type: String,
        required: true,
    },
    preorder: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


var DisRazdelMissPolin = mongoose.model('DisRazdelMissPolin', DisRazdelMissPolinSchema);

module.exports = DisRazdelMissPolin;