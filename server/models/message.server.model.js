const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    message: String,
    num_read: Number,
    sent_at: Date,
    created_at: Date
});

module.exports = mongoose.model('Message', MessageSchema);