$( document ).ready(function() {


// Create a div/span for displaying buttons
var headerDivButtons = $("<div>");
headerDivButtons.attr("id", "sectionRowButtons");
$("#bodyHeader").append(headerDivButtons);


// Create a div/span for displaying gifs
var sectionDivGifs = $("<div>");
sectionDivGifs.attr("id", "displayGifs");
$("#mainSection").append(sectionDivGifs);


// Create an input field for adding new gifs
var userSubmitGif = $("<form>");
userSubmitGif.attr({id: "userSubmitGif"})
userSubmitGif.append(`<input type="text" id="countryTextField" name="countryInput">`);
userSubmitGif.append(`<input type="button" id="countrySubmitButton" value="Submit">`);
$("#submitButton").append(userSubmitGif);


// A storage place for holding country names for buttons which show the Gifs
var arrayCountries = ["America", "Italy", "Canada", "Spain", "Scotland", "China", "Japan", "Russia", "South Africa", "Argentina"];


// Create a series of buttons for different countries from the stored array arrayCountries
arrayCountries.forEach(function(country) {
    $("#sectionRowButtons").append("<button id=" + country.toLocaleLowerCase().replace(/\s/g, '') + "-button class='btn buttonCountry' data-country=" + country.toLocaleLowerCase().replace(/\s/g, '') + ">" + country + "</button>")
});



// Variable for the user's input in userSubmitGif for passing their value to a new button
$(document).on("click", "#countrySubmitButton", function() {
    var userInputCountry = $("#countryTextField").val().trim();
    $("#sectionRowButtons").append("<button id=" + userInputCountry.toLocaleLowerCase().replace(/\s/g, '') + "-button class='btn buttonCountry' data-country=" + userInputCountry.toLocaleLowerCase().replace(/\s/g, '') + ">" + userInputCountry + "</button>")
    arrayCountries.push(userInputCountry);
    console.log("user's country ", userInputCountry);
    console.log("country array ", arrayCountries.length, arrayCountries);
});



$(document).on("click", ".buttonCountry", function() {

// Clear the previous gifs from #displayGifs for the next batch
$("#displayGifs").empty();

// Capture the name of the country to provide the query search
var buttonCountryName = $(this).attr("data-country");

// Variable for Giphy's api url
    // It takes in the variable from the submit field #countrySubmitButton
    var queryUrl = "https://api.giphy.com/v1/gifs/search" + 
                    "?api_key=RCrSzACA9PUFcbZbtODIgv9GmqCQYPoG" + 
                    // Wrong - should take the value from a button
                    "&q=" + buttonCountryName + 
                    "&limit=10" + 
                    "&offset=0" + 
                    "&rating=G" + 
                    "&lang=en";

// Ajax api call to Giphy
$.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function(response) {
        var giphyResults = response.data;
        console.log(giphyResults.length);

        // display Gifs to #sectionDivGifs
        for (a=0; a < giphyResults.length; a++) {
            var giphyImage = $("<img>");
            giphyImage.attr("src", giphyResults[a].images.fixed_height.url);
            $("#displayGifs").append(giphyImage);
        };
    });
}); // end of buttonCountry on-click-event


}); // End of document.ready method