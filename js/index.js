/* Goals:
    1. UTILIZE WEATHER UNDERGROUND API
    2. FIND CLOSEST WEATHER STATION TO GIVEN GPS COORDINATES
    3. GATHER LOCAL WEATHER FROM THAT STATION
*/

// JSON variable holding weather data
var weatherData;

// initiate loading screen
function initLoadingScreen() {}

// disable loading screen
function disableLoadingScreen() {}

// TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
function wUndergroundData(callback) {
    // TODO: FIND CLOSEST WEATHER STATION TO CURRENT GPS COORDS (return PWS name as string!)
    var pws = closestPWS();
    // TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
    weatherData = output;
    
    if (typeof callback === "function") {
        return callback();
    }
};

// Determine GPS location
function gpsLocation (callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
    
            //$("#quote").html("latitude: " + gps.latitude + "<br>longitude: " + gps.longitude);
            if (typeof callback === "function") {
                return callback(latitude, longitude);
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
    initLoadingScreen();
    // TODO: Obtain JSON from weather underground's closest PWS (personal weather station)
    wUndergroundData();
    // prepare page
    preparePage();
    // TODO: DISABLE LOADING SCREEN
    disableLoadingScreen();
}

// On page launch:
$(document).ready(function (){
    // display page information
    loadPage();
    // Listen for button/other activity on web page
    
});