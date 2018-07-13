$( document ).ready(function() {

// Create a header element to the dom
$("body").append("<header>")
// Add header text "Giphy's all over the world yo!"
$("header").append("<h1>Giphy's all over the world yo!</h1>");


// Create the main section of the body
$("body").append("<section>");


// Create a div/span for displaying buttons
var headerDivButtons = ("<div>");
$(headerDivButtons).attr("id", "headerRowButtons");
$("section").append(headerDivButtons);


// Create a div/span for displaying gifs
var sectionDivGifs = ("<div>");
$(sectionDivGifs).attr("id", "displayGifs")
$("section").append(sectionDivGifs);


// Create an input field for adding new gifs
var userSubmitGif = $("<form>");
$(userSubmitGif).attr("id", "userSubmitGif")
$(userSubmitGif).append(`<input type="text" name="countryInput" value="">`);
$(userSubmitGif).append(`<input type="submit" value="Submit">`);
$("section").append(userSubmitGif);


// A storage place for holding country names for buttons which show the Gifs
var arrayCountries = ["America", "Italy", "Canada", "Spain", "Scotland", "China", "Japan", "Russia", "South Africa", "Argentina"]


// Create a series of buttons for different countries from the stored array arrayCountries
arrayCountries.forEach(function(country) {
    var sectionGifsButton = $("<button>");
    sectionGifsButton.attr("id", country + "-button");
    $("#sectionDivGifs").append(sectionGifsButton);
});


// Variable for the user's input in userSubmitGif for passing their value to a new button
var userInputCountry = $("#userSubmitGif").val();


// Ajax api call to Giphy
// Variable for Giphy's api url
    // It takes in the variable from the submit field
    var queryUrl = "https://api.giphy.com/v1/gifs/search" + 
                    "?api_key=RCrSzACA9PUFcbZbtODIgv9GmqCQYPoG" + 
                    // Wrong - should take the value from a button
                    "&q=" + userInputCountry + 
                    "&limit=10" + 
                    "&offset=0" + 
                    "&rating=G" + 
                    "&lang=en";


$.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function(response) {
        console.log(response);

        // display Gifs to #sectionDivGifs 
    })



}); // End of document.ready method