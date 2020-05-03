
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

    $(document).on("click", ".article-notes", function() {
        var thisId = $(this).attr("data-id");
      
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
        .then(function(data) {
            let noteInfo = $("<div>")
            for (i=0; i < data.length; i++) {
                noteInfo.append($("<div>").addClass("col-sm-7").text(data[i].body),
                $("<div>").addClass("col-sm-4").text("Date made: " + (data[i].date).slice(0, 10)),
                $("<button>").addClass("btn btn-danger col-sm-1").attr("id", "delete-note").attr("data-id", data[i].id).text("x")
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
        }).then(function(data) {
            $("#"+thisId+"-notebody").empty()
            location.reload()
        })
    })

    //On click event listener to delete a specific note
    $(document).on("click", "#delete-note", function() {
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/deleteNote/" + thisId
        }).then(function(data) {
                console.log("testing")
                if (data.ok) {
                    $.remove("#"+thisId+"-specialNote")
                }
            })

        $.ajax("/saved", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            })

    })


});