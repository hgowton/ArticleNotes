var mongoose = require("mongoose");
var Schema = mongoose.Schema

var NoteSchema = new Schema({
    body: {
        body: String,
        required: true
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;