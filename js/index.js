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

// disable loading screen
function disableLoadingScreen() {}

// TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
function wUndergroundData(pwsid, callback) {
    // TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
    var jsonurl = "http://api.wunderground.com/api/df2e1eae3a020940/geolookup/conditions/q/pws:" + pwsid + ".json";
    $.ajax({
        url : jsonurl,
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            weatherData = parsed_json['current_observation'];
            var temp_f = weatherData['temp_f'];
            $('#quote').html("Current temperature in " + pws.neighborhood + " is: ");
            $('#temp').html(temp_f + "&deg;");
            $('#tempToggle').html("F");
            fcToggleTracker = 'f';
        }
    });
    
    
    if (typeof callback === "function") {
        
    }
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
                
                callback(pwsid);
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
            //$("#quote").html("latitude: " + latitude + "<br>longitude: " + longitude);
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
    switch (currentTemperature) {
        // case 1 -- coral
        case 1: backgroundImage = "rgb(255, 127, 80)";
            break;
        // case 2 -- cornflowerblue
        case 2: backgroundImage = "rgb(100, 149, 237)";
            break;
        // case 3 -- chocolate
        case 3: backgroundImage = "rgb(210, 105, 30)";
            break;
        // case 4 -- burlywood
        case 4: backgroundImage = "rgb(222, 184, 135)";
            break;
        // case 5 -- cadetblue
        case 5: backgroundImage = "rgb(95, 158, 160)";
            break;
        // case 6 -- darkseagreen
        case 6: backgroundImage = "rgb(143, 188, 143)";
            break;
        // case 7 -- darkturquoise
        case 7: backgroundImage = "rgb(143, 188, 143)";
            break;
        // case 8 -- goldenrod
        case 8: backgroundImage = "rgb(218, 165, 32)";
            break;
        // case 9 -- lightpink
        case 9: backgroundImage = "rgb(255, 182, 193)";
            break;
        // case 10 -- lightskyblue
        case 10: backgroundImage = "rgb(135, 206, 250)";
            break;
        // case 11 -- mediumaquamarine
        case 11: backgroundImage = "rgb(102, 205, 170)";
            break;
        // case 12 -- olivedrab
        case 12: backgroundImage = "rgb(107, 142, 35)";
            break;
        // case 13 -- peru
        case 13: backgroundImage = "rgb(205, 133, 63)";
            break;
        // case 14 -- plum
        case 14: backgroundImage = "rgb(221, 160, 221)";
            break;
        // case 15 -- tomato
        case 15: backgroundImage = "rgb(255, 99, 71)";
            break;
    }
    
    return backgroundImage;
}

// populate page with weather information
function displayWeather() {}

// prepare page
function preparePage() {
    // Load Temperature-Based Background (TBB)
    loadTBB();
    // Display standard weather information
    displayWeather();
}

// load page
function loadPage() {
    // TODO: INITIATE LOADING SCREEN
    /*initLoadingScreen();*/
    // TODO: Update GPS location of user
    gpsLocation(closestPWS);
    // prepare page
    /*preparePage();*/
    // TODO: DISABLE LOADING SCREEN
    /*disableLoadingScreen();*/
}

// On page launch:
$(document).ready(function (){
    // display page information
    loadPage();
    // Listen for button/other activity on web page
    // Farenheit-celsius toggle button (a.k.a. fcToggleBtn)
    $('#tempToggle').click(function () {
        // fcToggleTracker can either be 'f' or 'c'
        if (fcToggleTracker === 'f') {
            $('#temp').html(weatherData.temp_c + "&deg;");
            $('#tempToggle').html("C");
            fcToggleTracker = 'c';
        } else {
            $('#temp').html(weatherData.temp_f + "&deg;");
            $('#tempToggle').html("F");
            fcToggleTracker = 'f';
        }
    });
});