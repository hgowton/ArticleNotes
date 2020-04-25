
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

    //Button listener to delete all articles from database
    $(".deleteArticles").on("click", function() {
        $.ajax("/deleteArticles", {
            type: "GET"
        }).then(
            function() {
                location.reload()
            })

    })

    //Note Button
});