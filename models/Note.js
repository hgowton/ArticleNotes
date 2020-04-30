var mongoose = require("mongoose");
var Schema = mongoose.Schema

var NoteSchema = new Schema({
    body: {
        type: String,
        minlength: 1
    },
    date: { 
        type: Date,
        default: Date.now
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;