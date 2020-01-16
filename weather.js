$(document).ready(function(){
    
    var searchForecast = $('<div>').addClass('forecast card-body');
    $('.city-forecast').append(searchForecast);

    // searchForecast.addClass('search-forecast card ');
    // $('.city-forecast').append(searchForecast);


    

    
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
        populateFiveDay(city.val())

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
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4074b5f07760c717f95e1eec3f81ef1f";
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var temperature = $('<p>').addClass('attribute').text(`Temperature: ${response.main.temp} ˚F`)
            var humidity = $('<p>').addClass('attribute').text(`Humidity: ${response.main.humidity}%`);
            var windSpeed = $('<p>').addClass('attribute').text(`Wind Speed ${response.wind.speed} MPH`);  
            var name = $('<h2>').addClass('city').text(response.name);
            searchForecast.append(name);
            searchForecast.append(temperature);
            searchForecast.append(humidity);
            searchForecast.append(windSpeed);
            //grab latitude to use in UV index
            // grab longitude to use in UV index
            var lat = (response.coord.lat);
            var lon = (response.coord.lon);
            console.log(lat,lon);
            
            
            
            // add date next to name
            // add UV Index to card
            getUVIndex(lat,lon);
            
            
        
        })
        function getUVIndex(lat,lon){
        var queryURL2= "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=4074b5f07760c717f95e1eec3f81ef1f";
            $.ajax({
                url:queryURL2,
                method: "GET"
            }).then(function(response){
                console.log(response);
                var uvIndex = $('<p>').addClass('attribute').text(`UV Index ${response[0].value}`);
                searchForecast.append(uvIndex);
                console.log(response[0].value)
            }) 
        }    
    }            
    // create function to populate five day forecast.  use .each to loop through days.
    function populateFiveDay(city){
        var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&mode=xml&appid=4074b5f07760c717f95e1eec3f81ef1f";
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var forecastDayOne = $('<div>').addClass('card-body text-white bg-info mb-3 day-one');
            var forecastDayTwo = $('<div>').addClass('card-body text-white bg-info mb-3 day-two');
            var forecastDayThree = $('<div>').addClass('card-body text-white bg-info mb-3 day-three');;
            var forecastDayFour = $('<div>').addClass('card-body text-white bg-info mb-3 day-four');;
            var forecastDayFive = $('<div>').addClass('card-body text-white bg-info mb-3 day-five');;

            var fiveDayForecast = $('<div>').addClass('five-day');
            
            (fiveDayForecast).append(forecastDayOne);
            (fiveDayForecast).append(forecastDayTwo);
            (fiveDayForecast).append(forecastDayThree);
            (fiveDayForecast).append(forecastDayFour);
            (fiveDayForecast).append(forecastDayFive);
            $('.five-day-forecast').append(fiveDayForecast);
        })

    // add event listener to search by city to be able to click on buttons in search history
        }
    
})
   

