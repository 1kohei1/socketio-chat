const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    logoff_at: Date,
    is_online: Boolean,
    created_at: Date
});

module.exports = mongoose.model('User', UserSchema);