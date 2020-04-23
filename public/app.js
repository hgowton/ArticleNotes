//Grab the articles as a json
$.getJSON("/articles", function(data) {
    //Print the titles of the articles to the articles id
    //Each article has a data-id attribute to call upon later
    for (var i=0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + date[i]._id + "'>" + data[i].title + "</p>");
    }
})

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