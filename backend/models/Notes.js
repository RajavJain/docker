const mongoose = require('mongoose');
const {Schema} = mongoose;//imported Schema from mongoose for exporting purpose as it was giving error


const NotesSchema = new Schema({
    //ye bs isliye daala hai taaki kisi tarah user(jaise yaha par userId link kr di hai hamne) and notes aapas mai relate ho paae... to have security, kahin aisa na ho ki kisi aur k note kisi doosre ko dikh jaae...
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },


    title:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true,
    },

    tag:{
        type: String,
        default: "general"
    },

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes',NotesSchema)
