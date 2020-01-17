$(document).ready(function(){
    
    

    // searchForecast.addClass('search-forecast card ');
    // $('.city-forecast').append(searchForecast);


    

    
    $('#search').click(function(){
        event.preventDefault();
        $('.city-forecast').empty();
        $('.five-day').empty();
        var cities = [];
        var city = $('#input');
        if(localStorage.getItem('key')){
            cities = JSON.parse(localStorage.getItem('key'));  
        };
        cities.push(city.val());
        localStorage.setItem('key',JSON.stringify(cities))
        populateSearchHistory(); 
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
        var searchForecast = $('<div>').addClass('forecast');
        $('.city-forecast').append(searchForecast);
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4074b5f07760c717f95e1eec3f81ef1f";
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var temperature = $('<p>').addClass('attribute').text(`Temperature: ${response.main.temp} ˚F`)
            var humidity = $('<p>').addClass('attribute').text(`Humidity: ${response.main.humidity}%`);
            var windSpeed = $('<p>').addClass('attribute').text(`Wind Speed ${response.wind.speed} MPH`);  
            var name = $('<h2>').addClass('city').text(`${response.name} (${moment().format('M/D/YYYY')})`)
            var icon = $('<img>').addClass("icon").attr('src','https://openweathermap.org/img/wn/'+response.weather[0].icon+'@2x.png');
            name.append(icon);
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
                
                var uvIndex = $('<p>').addClass('attribute').text(`UV Index ${response[0].value}`);
                searchForecast.append(uvIndex);
                
            }) 
        }    
    }            
    // create function to populate five day forecast.  use .each to loop through days.
    function populateFiveDay(city){
        var queryURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&mode=JSON&appid=4074b5f07760c717f95e1eec3f81ef1f";
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // add the elements to hold the 5 day forecast
            var title = $('<h2>').text('5-Day Forecast');

            var forecastDayOne = $('<div>').addClass('card-body text-white bg-info mb-3 day-one');
            var forecastDayTwo = $('<div>').addClass('card-body text-white bg-info mb-3 day-two');
            var forecastDayThree = $('<div>').addClass('card-body text-white bg-info mb-3 day-three');;
            var forecastDayFour = $('<div>').addClass('card-body text-white bg-info mb-3 day-four');;
            var forecastDayFive = $('<div>').addClass('card-body text-white bg-info mb-3 day-five');;
            var fiveDayForecast = $('<div>').addClass('five-day card-group');
            //  populate cards for each day starting with the day after today
            //date
            var dateOne = $('<h5>').addClass('date').text(moment(response.list[5].dt_txt).format('M/D/YYYY'));
            var dateTwo = $('<h5>').addClass('date').text(moment(response.list[13].dt_txt).format('M/D/YYYY'));
            var dateThree = $('<h5>').addClass('date').text(moment(response.list[21].dt_txt).format('M/D/YYYY'));
            var dateFour = $('<h5>').addClass('date').text(moment(response.list[29].dt_txt).format('M/D/YYYY'));
            var dateFive = $('<h5>').addClass('date').text(moment(response.list[37].dt_txt).format('M/D/YYYY'));
            (forecastDayOne).append(dateOne);
            (forecastDayTwo).append(dateTwo);
            (forecastDayThree).append(dateThree);
            (forecastDayFour).append(dateFour);
            (forecastDayFive).append(dateFive);
                // include data, icon for conditions, temp and humidity.
             // populate condition icon
            var iconOne = $('<img>').addClass('weather-icon').attr('src','https://openweathermap.org/img/wn/'+response.list[5].weather[0].icon+'@2x.png');
            (forecastDayOne).append(iconOne);  
            var iconTwo = $('<img>').addClass('weather-icon').attr('src','https://openweathermap.org/img/wn/'+response.list[13].weather[0].icon+'@2x.png');
            (forecastDayTwo).append(iconTwo); 
            var iconThree = $('<img>').addClass('weather-icon').attr('src','https://openweathermap.org/img/wn/'+response.list[21].weather[0].icon+'@2x.png');
            (forecastDayThree).append(iconThree);  
            var iconFour = $('<img>').addClass('weather-icon').attr('src','https://openweathermap.org/img/wn/'+response.list[29].weather[0].icon+'@2x.png');
            (forecastDayFour).append(iconFour); 
            var iconFive = $('<img>').addClass('weather-icon').attr('src','https://openweathermap.org/img/wn/'+response.list[37].weather[0].icon+'@2x.png');
            (forecastDayFive).append(iconFive); 
            // temp    
            var tempOne = $('<p>').addClass('forecast-temp').text(`Temp: ${response.list[5].main.temp}˚F`);
            var tempTwo = $('<p>').addClass('forecast-temp').text(`Temp: ${response.list[13].main.temp}˚F`);
            var tempThree = $('<p>').addClass('forecast-temp').text(`Temp: ${response.list[21].main.temp}˚F`);
            var tempFour = $('<p>').addClass('forecast-temp').text(`Temp: ${response.list[29].main.temp}˚F`);
            var tempFive = $('<p>').addClass('forecast-temp').text(`Temp: ${response.list[37].main.temp}˚F`);
            (forecastDayOne).append(tempOne);
            (forecastDayTwo).append(tempTwo);
            (forecastDayThree).append(tempThree);
            (forecastDayFour).append(tempFour);
            (forecastDayFive).append(tempFive);
            // humidity
            var humidityOne = $('<p>').addClass('forecast-temp').text(`Humidity: ${response.list[3].main.temp}%`);
            var humidityTwo = $('<p>').addClass('forecast-temp').text(`Humidity: ${response.list[11].main.temp}%`);
            var humidityThree = $('<p>').addClass('forecast-temp').text(`Humidity: ${response.list[19].main.temp}%`);
            var humidityFour = $('<p>').addClass('forecast-temp').text(`Humidity: ${response.list[27].main.temp}%`);
            var humidityFive = $('<p>').addClass('forecast-temp').text(`Humidity: ${response.list[35].main.temp}%`);
            (forecastDayOne).append(humidityOne);
            (forecastDayTwo).append(humidityTwo);
            (forecastDayThree).append(humidityThree);
            (forecastDayFour).append(humidityFour);
            (forecastDayFive).append(humidityFive);
            // append elements to div and then to parent element in html.
            (fiveDayForecast).append(forecastDayOne);
            (fiveDayForecast).append(forecastDayTwo);
            (fiveDayForecast).append(forecastDayThree);
            (fiveDayForecast).append(forecastDayFour);
            (fiveDayForecast).append(forecastDayFive);
            $('.five-day-forecast').append(title);
            $('.day-forecasts').append(fiveDayForecast);
            
        })
            
    // add event listener to search by city to be able to click on buttons in search history
        }
    
})
   

