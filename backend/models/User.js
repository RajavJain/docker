const mongoose = require('mongoose');
const {Schema} = mongoose;//imported Schema from mongoose for exporting purpose as it was giving error

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',UserSchema)
