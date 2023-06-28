const mongoose = require('mongoose');
const {schema} = mongoose;

const noteSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required:true
    },
   description:{
        type: String,
        required:true
    },

})

const Note = mongoose.model('note',noteSchema);

module.exports = Note;