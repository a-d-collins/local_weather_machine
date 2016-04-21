/* Goals:
    1. UTILIZE WEATHER UNDERGROUND API
    2. FIND CLOSEST WEATHER STATION TO GIVEN GPS COORDINATES
    3. GATHER LOCAL WEATHER FROM THAT STATION
*/

// JSON variable holding weather data
var weatherData;

// pws variable
var pws;

// fcToggleTracker
var fcToggleTracker;

// initiate loading screen
function initLoadingScreen() {}

// hide loading icon and show #home-contents
// NOTE: This (and the corresponding html and css) is a cheap implementation of a loading page
// For a much much much better (and cooler) version see here: https://ihatetomatoes.net/create-css3-spinning-preloader/
// and here: https://ihatetomatoes.net/create-custom-preloading-screen/
function disableLoadingScreen() {
    $('#progressDiv').addClass('hidden');
    $('#home-contents').removeClass('hidden');
}

// TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
function wUndergroundData(pwsid, callback1, callback2) {
    // TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
    var jsonurl = "http://api.wunderground.com/api/df2e1eae3a020940/geolookup/conditions/q/pws:" + pwsid + ".json";
    $.ajax({
        url : jsonurl,
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            weatherData = parsed_json['current_observation'];
            var temp_f = weatherData['temp_f'];
            $('#townAndState').html(pws.neighborhood + ", " + pws.state + ": ");
            // Set #conditionsIcon
            $('#conditionsIcon').css('background-image', 'url("//icons.wxug.com/i/c/v4/' + weatherData.icon + '.svg")');
            $('#temp').html(temp_f + "&deg;");
            $('#tempToggle').html("F");
            fcToggleTracker = 'f';
            $('#feelsLike').html(weatherData.feelslike_f + "&deg;F");
            $('#wdCategory1Data').html(weatherData.weather);
            $('#windSpeed').html(weatherData.wind_gust_mph);
            $('#windDirection').html(weatherData.wind_dir);
            $('#dewPoint').html(weatherData.dewpoint_f);
            $('#humidity').html(weatherData.relative_humidity);
            
            if (typeof callback1 === "function") {
                // Load Temperature-Based Background (TBB)
                callback1(weatherData.temp_f);
            }
            if (typeof callback2 === "function") {
                // DISABLE PROGRESS ICON AND MAKE HOME-CONTENTS VISIBLE
                callback2();
            }
        }
    });
}

// Determine closest PWS then call wUndergroundData function using PWS info
function closestPWS(latitude, longitude, callback) {
    if (latitude === undefined) {
        alert("Latitude is undefined");
    } else if (longitude === undefined) {
        alert("Longitude is undefined");
    } else {
        // http://api.wunderground.com/api/df2e1eae3a020940/geolookup/q/37.776289,-122.395234.json
        var jsonurl = "http://api.wunderground.com/api/df2e1eae3a020940/geolookup/q/" + latitude + "," + longitude + ".json";
        $.ajax({
            url : jsonurl,
            dataType : "jsonp",
            success : function(parsed_json) {
                var pwstations = parsed_json['location']['nearby_weather_stations']['pws']['station'];
                // Your true pws is first (position 0) on the list
                pws = pwstations[0];
                var location = pws["city"];
                var pwsid = pws["id"];
                // TEST ALERTS
                //alert("Current pws in " + location + " is: " + pws.neighborhood);
                //alert("Current pws in " + location + " is: " + pwsid);
                
                callback(pwsid, loadTBB, disableLoadingScreen);
            }
        });
    }
}


// Determine GPS location
function gpsLocation (callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            //$("#townAndState").html("latitude: " + latitude + "<br>longitude: " + longitude);
            if (typeof callback === "function") {
                callback(latitude, longitude, wUndergroundData);
            }
        });
    }
}

// load Temperature-Based Background --> changes background image, depending on temperature
function loadTBB(currentTemperature) {
    var backgroundImage;
    // TODO: Choose a background image based on what temperature range the currentTemperature falls within
    if (currentTemperature < 32) {
        backgroundImage = 'http://www.thesentinel.com/mont/images/jacqui_photo_-_snow_on_norbeck_road.jpg';
    } else if (currentTemperature < 50) {
        backgroundImage = 'http://cdn1.landscapehdwalls.com/thumbs/1/evergreen-forest-surrounding-the-lake-4515-706.jpg';
    } else if (currentTemperature < 70) {
        backgroundImage = 'http://www.astonhotels.com/assets/slides/690x380-Lake-Tahoe-Summer-Emerald-Bay.jpg';
    } else if (currentTemperature < 85) {
        backgroundImage = 'https://theworldtodayandtomorrow.files.wordpress.com/2014/02/lavendersunshine-543421.jpeg';
    } else {
        backgroundImage = 'https://amanderings.files.wordpress.com/2013/01/1392471_37955830.jpg';
    }
    
    /* DON'T USE SWITCH STATEMENTS THIS WAY! THIS IS NOT A VALID OPTION IN MANY OTHER PROGRAMMING LANGUAGES
    switch (currentTemperature) {
        // case 1
        case (currentTemperature < 32.0):
            backgroundImage = 'http://www.thesentinel.com/mont/images/jacqui_photo_-_snow_on_norbeck_road.jpg';
            break;
        // case 2
        case (currentTemperature < 50.0):
            backgroundImage = 'http://cdn1.landscapehdwalls.com/thumbs/1/evergreen-forest-surrounding-the-lake-4515-706.jpg';
            break;
        // case 3
        case (currentTemperature < 70.0):
            backgroundImage = 'http://www.astonhotels.com/assets/slides/690x380-Lake-Tahoe-Summer-Emerald-Bay.jpg';
            break;
        // case 4
        case (currentTemperature < 85.0):
            backgroundImage = 'https://theworldtodayandtomorrow.files.wordpress.com/2014/02/lavendersunshine-543421.jpeg';
            break;
        // case 5
        default:
            backgroundImage = 'https://amanderings.files.wordpress.com/2013/01/1392471_37955830.jpg';
    }*/
    
    // TODO: Fade in a background that matches the temperature conditions
    if (backgroundImage !== undefined) {
        $('body').css('background-image', 'url("' + backgroundImage + '")');
    } else {
        alert ("Unable to display background due to lack of weather information.");
    }
    
    return 'url("' + backgroundImage + '")';
}

// Set update time
function updateTime () {
    var d = new Date();
    
    function concatTime() {
        var time = [d.getHours(), d.getMinutes(), d.getSeconds()];
        var timeString = '';
        for (var i = 0; i < time.length; i++) {
            if (time[i] < 10) {
                timeString += 0;
            }
            timeString += time[i];
            
            if (i < (time.length - 1)) {
                timeString += ':';
            }
        }
        
        return timeString;
    }
    
    $('#updateTime').html(concatTime());
    
    if ($('#updateLog').hasClass('hidden')) {
        $('#updateLog').removeClass('hidden');
    }
}

// populate page with weather information
function displayWeather() {}

// prepare page
function preparePage() {
    // Load Temperature-Based Background (TBB)
    loadTBB(weatherData.temp_f);
    // Display standard weather information
    //displayWeather();
}

// load page
function loadPage() {
    // TODO: INITIATE LOADING ICON (Or have it load right away...)
    /*initLoadingScreen();*/
    // Update GPS location of user
    gpsLocation(closestPWS);
    // prepare page
    /*preparePage();*/
}

// On page launch:
$(document).ready(function (){
    // display page information
    loadPage();
    
    // Listen for button/other activity on web page
    // Farenheit-celsius toggle
    $('.tempToggleClass').click(function () {
        // fcToggleTracker can either be 'f' or 'c'
        if (fcToggleTracker === 'f') {
            $('#temp').html(weatherData.temp_c + "&deg;");
            $('#feelsLike').html(weatherData.feelslike_c + "&deg;C");
            $('#dewPoint').html(weatherData.dewpoint_c);
            $('.tempToggleClass').html("C");
            fcToggleTracker = 'c';
        } else {
            $('#temp').html(weatherData.temp_f + "&deg;");
            $('#feelsLike').html(weatherData.feelslike_f + "&deg;F");
            $('#dewPoint').html(weatherData.dewpoint_f);
            $('.tempToggleClass').html("F");
            fcToggleTracker = 'f';
        }
    });
    
    /* TEST BACKGROUND TRANSITIONS
    
    var counter = 0;
    $('#testButton').click(function () {
        if (counter < 1) {
            $('body').css('background-image', 'url("http://www.thesentinel.com/mont/images/jacqui_photo_-_snow_on_norbeck_road.jpg")');
            $('#temp').html(100 + "&deg;");
        } else if (counter < 2) {
            $('body').css('background-image', 'url("http://cdn1.landscapehdwalls.com/thumbs/1/evergreen-forest-surrounding-the-lake-4515-706.jpg")');
            $('#temp').html(100 + "&deg;");
        } else if (counter < 3) {
            $('body').css('background-image', 'url("http://www.astonhotels.com/assets/slides/690x380-Lake-Tahoe-Summer-Emerald-Bay.jpg")');
            $('#temp').html(100 + "&deg;");
        } else if (counter < 4) {
            $('body').css('background-image', 'url("https://theworldtodayandtomorrow.files.wordpress.com/2014/02/lavendersunshine-543421.jpeg")');
            $('#temp').html(100 + "&deg;");
        } else {
            $('body').css('background-image', 'url("https://amanderings.files.wordpress.com/2013/01/1392471_37955830.jpg")');
            $('#temp').html(100 + "&deg;");
            counter = -1;
        }
        ++counter;
    });*/
    
    // UPDATE weather conditions
    $('#updateBtn').click(function (){
        wUndergroundData(pws.id, loadTBB);
        
        updateTime();
    });
    
    // Window resize --> Dynamically change body height (for more: http://tutorialshares.com/dynamically-change-div-height-browser-window-resize/)
    $(window).resize(function(){ // On resize
		$('body').css({'height':(($(window).height()))+'px'});
	});
});