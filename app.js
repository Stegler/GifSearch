// var type = "batman";

// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8c9ZjVfsbKwiGHW3vFfNHCaI2lScVEBo&limit=10";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });

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


function showgif() {
    var type = "cars";

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8c9ZjVfsbKwiGHW3vFfNHCaI2lScVEBo&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);

        // var still = response.data

        // var gifImage = $("<img>");
        // gifImage.attr("src", still);

    });
};

renderButtons();
showgif();