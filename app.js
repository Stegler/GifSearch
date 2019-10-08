// Initial array of gifs
var gifs = ["Leonardo Dicaprio", "Adam Sandler", "Gal Gadot", "Will Smith"];

// Function for displaying gif buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each actor in the array.
        var button = $("<button>");
        // Adding a class
        button.addClass("btn btn-outline-secondary button");
        // Adding a data-attribute with a value of the data-name at index i
        button.attr("data-name", gifs[i]);
        // Providing the button's text with a value of the gif at index i
        button.text(gifs[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(button);
    }
}

// This function is called when a button is clicked
$(".gif-add").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // Captures value of input field
    var gifName = $("#gif-input").val().trim();

    // Pushing the input into gifs array
    gifs.push(gifName);

    renderButtons();

});

// This function makes the AJAX request and loops through the results
function showgif() {
    var type = "boats";

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8c9ZjVfsbKwiGHW3vFfNHCaI2lScVEBo&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Creating a div tag to store all info for each result from ajax response
            var gifDiv = $("<div>");

            // Creating a paragraph tag to store rating info
            var ratingDiv = $("<p>").text("Rating " + results[i].rating);

            // Creating an image tag to show the gif image
            var gifImage = $("<img>");

            // Setting a src attribute to the image tag
            gifImage.attr("src", results[i].images.fixed_height.url);

            // Appending ratingDiv and gifImage to gifDiv
            gifDiv.append(ratingDiv);
            gifDiv.append(gifImage);

            // Prepending the divs created with the for-loop to the div in the HTML
            $(".display-gifs").prepend(gifDiv);

        }
    });
};

renderButtons();
showgif();