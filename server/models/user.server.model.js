const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    thumbnail_url: String,
    logoff_at: Date,
    created_at: Date
});

module.exports = mongoose.model('User', UserSchema);