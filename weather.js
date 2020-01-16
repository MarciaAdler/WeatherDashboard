$(document).ready(function(){
    
    var searchForecast = $('<div>').addClass('forecast');
    $('.city-forecast').append(searchForecast);

    // searchForecast.addClass('search-forecast card ');
    // $('.city-forecast').append(searchForecast);


    var forecastDayOne = $('<div>');
    forecastDayOne.addClass('card-body text-white bg-info mb-3 day-one');
    var forecastDayTwo = $('<div>');
    forecastDayTwo.addClass('card-body text-white bg-info mb-3 day-two');
    var forecastDayThree = $('<div>');
    forecastDayThree.addClass('card-body text-white bg-info mb-3 day-three');
    var forecastDayFour = $('<div>');
    forecastDayFour.addClass('card-body text-white bg-info mb-3 day-four');
    var forecastDayFive = $('<div>');
    forecastDayFive.addClass('card-body text-white bg-info mb-3 day-five');

    var fiveDayForecast = $('<div>');
    fiveDayForecast.addClass('five-day');
    $('.day-one').append(forecastDayOne);
    $('.day-two').append(forecastDayTwo);
    $('.day-three').append(forecastDayThree);
    $('.day-four').append(forecastDayFour);
    $('.day-five').append(forecastDayFive);
    $('.five-day-forecast').append(fiveDayForecast);

    
    $('#search').click(function(){
        event.preventDefault();
        
        var cities = [];
        var city = $('#input');
        if(localStorage.getItem('key')){
            cities = JSON.parse(localStorage.getItem('key'));  
        }
        cities.push(city.val());
        localStorage.setItem('key',JSON.stringify(cities))
        populateSearchHistory() 
        searchByCity(city.val());
        $('#input').val('');
            
    })
    function populateSearchHistory (){
        $('.city-list').empty();
        var cities = JSON.parse(localStorage.getItem('key'));
        $.each(cities,function(index,value){
            var newRow = $('<tr>')
            var location = $('<button>');
            location.addClass('search')
            location.text(value);
            newRow.append(location)
            $('.city-list').append(newRow);
        }) 
    }
    populateSearchHistory()

    function searchByCity(city){
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4074b5f07760c717f95e1eec3f81ef1f";
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var temperature = $('<p>').addClass('attribute').text(`Temperature: ${response.main.temp} ˚F`)
            var humidity = $('<p>').addClass('attribute').text(`Humidity: ${response.main.humidity}%`);
            var windSpeed = $('<p>').addClass('attribute').text(`Wind Speed ${response.wind.speed} MPH`);  
            var name = $('<h2>').addClass('city').text(response.name);
            name.append(temperature);
            name.append(humidity);
            name.append(windSpeed);
            searchForecast.append(name);
            
            
        })
        
    }

    // create function to populate five day forecast.  use .each to loop through days.

    // add event listener to search by city to be able to click on buttons in search history
})

