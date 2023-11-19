const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const noteModel = mongoose.model('notes', noteSchema);
module.exports = noteModel

