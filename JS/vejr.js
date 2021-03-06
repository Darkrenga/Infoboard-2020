// Update time 
setInterval(updateClock, 1000);


// PROXY => CORS Anywhere helps with accessing data from other websites that is normally forbidden by the same origin policy of web browsers. This is done by proxying requests to these sites via a server (written in Node.js, in this case).
const proxy = 'https://cors-anywhere.herokuapp.com/';

// API's
// 1§ vejr eu api

let vejrEuUrl = `${proxy}https://vejr.eu/api.php?location=Aalborg&degree=C%27))`; //henter API ned
// §2 DarkSky api
let darkSkyUrl = `${proxy}https://api.darksky.net/forecast/2f35c97a3f5b8edad9aecb3fa76058cb/57.0488,9.9217`;

let getWeatherData = fetchData(vejrEuUrl, darkSkyUrl)
console.log("fetching data");


const closureFunc = fetchData
closureFunc()




function fetchData (apiUrl1, apiUrl2) {
    /// 1§ VEJR EU API
// GET => temperature & skyText
fetch(apiUrl1) 
.then((response) => {
    return response.json(); 
})
.then((data) => {
    
    // Declare data 
    const {temperature, skyText} = data.CurrentData;
    
    buildView(temperature, skyText)
    
})
.catch(
);


/// 2§ DARK SKY API
// GET => Icon
fetch(apiUrl2) 
.then((response) => {
    return response.json(); 
})
.then((data) => {
    // Send to View section
    buildIcon(data) 
})
.catch(
);
}



/// View ///

function buildView(temperature, skyText) {
    document.querySelector('.temp').innerHTML = temperature + '&#176';
    document.querySelector('.summary').innerHTML = skyText;
    
    // Update weather every 30min
    setTimeout(() => {
        getWeatherData(vejrEuUrl, darkSkyUrl);
    }, 18000000);
}

function updateClock() {
    // Declare new Date
    let days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    let  months = ["januar", "febuar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
    

    let today = new Date();
    let monthName=months[today.getMonth()]; // Get current month
    let dayName = days[today.getDay()]; // Get current day of week
    let hr = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    month = `${dayName} d. ${dd}. ${monthName}`;

    para = ':';
    document.querySelector('.month').innerHTML = month;
    document.querySelector('.hour').innerHTML = `${hr}`;
    document.querySelector('.para').innerHTML = `${para}`;
    document.querySelector('.minutes').innerHTML = `${min}`;
}

/// Icon
function buildIcon(data) {
    const {icon} = data.currently;                  
    // Call getIcon
    console.log('hry')
    document.querySelector('.weather-container').style.backgroundImage =  `url('../img/weather/${getIcon(icon)}')` ; 
}
// Check current date and return appropriate src string
function getIcon(icon) {
   
    switch (icon) {
        // If status === case => then return matching weather icon 
        case 'clear-day': return "sunny.jpg";
        case 'clear-night': return "sunny.jpg";
        case 'partly-cloudy-day': return "partly-cloudy.jpg";
        case 'partly-cloudy-night': return "partly-cloudy.jpg";
        case 'cloudy': return "cloudy.jpg";
        case 'lightrain': return "light-rain.jpg";
        case 'occasionalshowers': return "rain.jpg";
        case 'rain': return "rain.jpg";
        case 'sleet': return "snow.jpg";
        case 'snow': return "snow.jpg";
        case 'wind': return "windy.jpg";
        case 'fog': return "foggy.jpg";

        default: return "";       
    }

    
    /* DarkSky weather types:

        clear-day
        clear-night
        partly-cloudy-day
        partly-cloudy-night
        cloudy
        rain
        sleet
        snow
        wind
        fog
    
    */
}

