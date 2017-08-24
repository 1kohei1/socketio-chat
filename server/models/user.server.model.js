const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    thumbnail_url: String,
    logoff_at: Date,
    is_online: Boolean,
    created_at: Date
});

module.exports = mongoose.model('User', UserSchema);