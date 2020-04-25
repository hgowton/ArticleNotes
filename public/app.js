
$(document).ready(function(){

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

    //Button listener to delete all articles from database
    $("#delete-articles").on("click", function() {
        $.ajax("/deleteArticles", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            })

    })

    $("#scrape-articles").on("click", function() {
        $.ajax("/scrape", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            });
    });

    //Note Button
});