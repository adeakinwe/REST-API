const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    discipline:{
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('friends', friendsSchema)