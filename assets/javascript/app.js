$( document ).ready(function() {

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Create a div/span for displaying buttons
var headerDivButtons = $("<div>");
headerDivButtons.attr("id", "sectionRowButtons");
$("#bodyHeader").append(headerDivButtons);


// Create a div for displaying country data
var sectionDivCtrys = $("<div>");
sectionDivCtrys.attr("id", "displayCtryData");
$("#mainSection").append(sectionDivCtrys);


// Create a div/span for displaying gifs
var sectionDivGifs = $("<div>");
sectionDivGifs.attr("id", "displayGifs");
$("#mainSection").append(sectionDivGifs);


// Create an input field for adding new gifs
var userSubmitGif = $("<form>");
userSubmitGif.attr({id: "userSubmitGif"});
userSubmitGif.append(`<input type="text" id="countryTextField" name="countryInput">`);
userSubmitGif.append(`<input type="button" id="countrySubmitButton" value="Submit">`);
// userSubmitGif.append(`<input type="button" id="test" value="Test">`);
$("#submitButton").append(userSubmitGif);


// A storage place for holding country names for buttons which show the Gifs
var arrayCountries = ["United States", "Italy", "Canada", "Spain", "Scotland", "China", "Japan", "Russia", "South Africa", "Argentina"];


// Create a series of buttons for different countries from the stored array arrayCountries
arrayCountries.forEach(function(country) {
    $("#sectionRowButtons").append("<button id=" + country.toLocaleLowerCase().replace(/\s/g, '') + "-button class='btn buttonCountry' data-title='" + country + "' data-country=" + country.toLocaleLowerCase().replace(/\s/g, '') + ">" + country + "</button>")
});



// Variable for the user's input in userSubmitGif for passing their value to a new button
$(document).on("click", "#countrySubmitButton", function() {
    var userInputCountry = $("#countryTextField").val().trim();
    $("#sectionRowButtons").append("<button id=" + userInputCountry.toLocaleLowerCase().replace(/\s/g, '') + "-button class='btn buttonCountry' data-title=" + userInputCountry.toLocaleLowerCase().replace(/\s/g, '') + " data-country=" + userInputCountry.toLocaleLowerCase().replace(/\s/g, '') + ">" + userInputCountry + "</button>")
    arrayCountries.push(userInputCountry);
    console.log("user's country ", userInputCountry);
    //console.log("country array ", arrayCountries.length, arrayCountries);
});



$(document).on("click", ".buttonCountry", function() {

// Clear the previous country data from #displayCtryData for the next batch
$("#displayCtryData").empty();


// API variable for REST Countries
var buttonCountryTitle = $(this).attr("data-title");
var countryQuery = "https://restcountries-v1.p.mashape.com/name/" + buttonCountryTitle

// API to REST Countries for adding more data to the user
$.ajax({
    url: countryQuery,
    beforeSend: function(request) {
        request.setRequestHeader("X-Mashape-Key", "w0TaY1R0EMmshu7xESXRujA05pxhp1Snif8jsnJYnEdLTSDKam")
    },
    method: "GET"
    })
        .then(function(response) {
            console.log("button Cty Title ", buttonCountryTitle);
            for (a=0; a < response.length; a++) {
                if (response[a].name === buttonCountryTitle) {
                    console.log("yay ", response[a].name);
                    console.log(response[a].name, " ", response[a]);
                    var correctCountry = response[a];
                }
                else {console.log("boo ", response[a].name)}
            };

        // Adding all the countries unique interest points
        var countryRegion = correctCountry.region;
        var regionSpan = $("<span>").append("Region: " + countryRegion);
        $("#displayCtryData").append(regionSpan);

        var countryCapital = correctCountry.capital;
        var capitalSpan = $("<span>").append("Capital: " + countryCapital);
        $("#displayCtryData").append(capitalSpan);

        var countryDemonym = correctCountry.demonym;
        var demonymSpan = $("<span>").append("Demonym: " + countryDemonym);
        $("#displayCtryData").append(demonymSpan);

        var countryPopulation = numberWithCommas(correctCountry.population);
        var populationSpan = $("<span>").append("Population: " + countryPopulation);
        $("#displayCtryData").append(populationSpan);

        
        });

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
                    "&rating=PG" +
                    "&lang=en";

// Ajax api call to Giphy
$.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function(response) {
        var giphyResults = response.data;
        console.log("Giphy response ", response.data);

        // display Gifs to #sectionDivGifs
        for (a=0; a < giphyResults.length; a++) {
            var gifDiv = $("<div class='gifItem'>");

            var rating = giphyResults[a].rating;

            var p = $("<p>").text("Rating: " + rating);

            var giphyImage = $("<img>");
            giphyImage.attr("src", giphyResults[a].images.fixed_height_still.url) 
                    .attr("data-still", giphyResults[a].images.fixed_height_still.url)
                    .attr("data-animate", giphyResults[a].images.fixed_height.url)
                    .attr("data-state", "still")
                    .attr("class", "gif");

            gifDiv.append(p);
            gifDiv.append(giphyImage);

            $("#displayGifs").append(gifDiv);
        };
    });



}); // end of buttonCountry on-click-event


// Click event that allows the user to click and pause each GIF
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
      }
      else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
      };
});

// $(document).on("click", "#test", function() {
//     var countryQuery = "https://restcountries-v1.p.mashape.com/name/" +
//                         "mexico"

//     $.ajax({
//         url: countryQuery,
//         beforeSend: function(request) {
//             request.setRequestHeader("X-Mashape-Key", "w0TaY1R0EMmshu7xESXRujA05pxhp1Snif8jsnJYnEdLTSDKam")},
//         method: "GET"
//         })
//         .then(function(response) {
//             console.log(response);
//         });
// });



}); // End of document.ready method