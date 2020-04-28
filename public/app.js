
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

    $(document).on("click", "#article-notes", function() {
        var thisId = $(this).attr("data-id");
      
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
        .then(function(data) {
        })
      })

    $(document).on("click", "#save-note", function() {
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        }).then(function(data) {
            console.log(thisId + data)
        })
        
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                body: $("#note-body").val()
            }
        }). then(function(data) {
            $("#note-body").empty()
            location.reload()
        })
    })


});