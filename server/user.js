const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Fullname: String,
    Email:String,
    DOB:Number,
    Gen:String,
    un:String,
    ps:String
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
