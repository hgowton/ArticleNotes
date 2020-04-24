
$(document).on("click", ".articleNotes", function() {
    //CREATE Open modal

    //Ajax call for the article
    $.ajax({
        method: "GET", 
        url:"/articles" + thisId
    })
    .then(function(data) {
        console.log(data);
        //Article Title  
        $("#notes").append("<h2>" + data.title + "</h2>");
        //create note
        $("#notes").append("<textarea id='note-input' name='newNote'>");
        //button to save note
        <button type="button" class="btn btn-success">Success</button>
        $("#notes").append("<button type='button' class='btn btn-success' id='savenote' data-id='" + data._id + "'> Save Note<button>");
        
        if (data.note) {
            $("#note-input").val(data.note.title);
        }
    });
});