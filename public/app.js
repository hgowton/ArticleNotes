
$(document).ready(function(){

    //Populates Articles in the database
    $("#scrape-articles").on("click", function() {
        $.ajax("/scrape", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            });
    });

    //Updates the article to saved: true in the database
    $(document).on("click", "#save-article", function() {
        var id = $(this).data("id");

        console.log("Saving article " + id);
        $.ajax("/saved/" + id, {
            type: "PUT"
        }).then(
            function() {
                location.reload();
            })
    })

    //Updates the article to saved: false in the database
    $(document).on("click", "#unsaved", function() {
        var id = $(this).data("id");

        console.log("Remove Saved Article " + id);
        $.ajax("/unsave/" + id, {
            type: "PUT"
        }).then(
            function() {
                location.reload();
            })
    })

    //Button listener to delete all unsaved articles from database
    $("#delete-articles").on("click", function() {
        $.ajax("/deleteArticles", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            })

    })

    // let info = $("<div>").addClass("specialNote") 

    $(document).on("click", ".article-notes", function() {
        var thisId = $(this).attr("data-id");
      
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
        .then(function(data) {
            console.log(data)
            let noteInfo = $("<div>")
            for (i=0; i < data.length; i++) {
                noteInfo.append($("<p>").text(data[i].body),
                $("<p>").text(data[i].date),
                $("<button>").addClass("btn btn-danger").attr("id", data[i]._id).attr("data-id", data[i]._id).text("x")
                )}
                $("#"+thisId+"-specialNote").append(noteInfo)
            })
      })

    //Adding a note for an article 
    $(document).on("click", "#save-note", function() {
        var thisId = $(this).attr("data-id");
        
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: $("#"+thisId+"-notebody").val()
            }
        }). then(function(data) {
            $("#"+thisId+"-notebody").empty()
            // console.log("the id: " + thisId)
            location.reload()
        })
    })


});