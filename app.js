$(document).ready(function () {

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
            button.addClass("btn btn-outline-secondary gif-button");
            // Adding a data-attribute with a value of the data-name at index i
            button.attr("data-name", gifs[i]);
            // Providing the button's text with a value of the gif at index i
            button.text(gifs[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(button);

        }
    }

    // This function is called when a button is clicked
    $(".add-button").on("click", function (event) {

        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // Captures value of input field
        var gifName = $("#gif-input").val().trim();

        // If user enters text add button
        if (gifName !== '') {

            // Add the input text to the array
            gifs.push(gifName);
            // Call the renderButtons function to display buttons for each item in the array
            renderButtons();

        }

        // Clears input field
        $(".form-control").val('');

    });

    // This function makes the AJAX request and loops through the results
    $("body").on("click", ".gif-button", function () {

        // Stores the attribute name of whichever button is clicked to then be used in the search query
        var type = $(this).attr("data-name");

        // Query URL with a limit of 10 gifs
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=8c9ZjVfsbKwiGHW3vFfNHCaI2lScVEBo&limit=10";

        // Clears the gif div so you only display 10 gifs at a time
        $(".display-gifs").empty();

        // AJAX Get request
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                // Only display gifs that are not rated R
                if (results[i].rating !== "r") {

                    // Creating a div tag to store all info for each result from ajax response
                    var gifDiv = $("<div>").css('margin-bottom','30px');

                    // Creating an image tag to show the gif image
                    var gifImage = $("<img>");

                    // Creating a paragraph tag to store rating info
                    var ratingDiv = $("<p>").text("Rating " + results[i].rating);

                    // Set src attribute to the gif url
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    // Appending ratingDiv and gifImage to gifDiv
                    gifDiv.append(gifImage);
                    gifDiv.append(ratingDiv);

                    // Prepending the divs created with the for-loop to the div in the HTML
                    $(".display-gifs").prepend(gifDiv);

                }
            }
        });
    });

    renderButtons();

});