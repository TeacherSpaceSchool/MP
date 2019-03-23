const mongoose = require('mongoose');

const MailingMissPolinSchema = mongoose.Schema({
    mailuser: {
        type: String,
        required: true,
    },
    mailpass: {
        type: String,
        required: true,
    },
    mailchimpInstance: {
        type: String,
        required: true,
    },
    listUniqueId: {
        type: String,
        required: true,
    },
    mailchimpApiKey: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const MailingMissPolin = mongoose.model('MailingMissPolin', MailingMissPolinSchema);

module.exports = MailingMissPolin;