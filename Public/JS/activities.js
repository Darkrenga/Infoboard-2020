async function fetchData() {
    //her henter vi data fra api'et
    let response = await fetch('https://api.mediehuset.net/infoboard/activities');

    if (response.status == '200') {
        //tjekker vi om det er af json format
        let data = await response.json();

        //hvis det er det, så kan vi tilgå data'en i andre funktioner
        return data.result;
    } else {
        
    }
};

//dette er vores controller som håndterer det data som kommer fra api'en
async function loadData() {
    //her sætter vi data'ene fra fetchData i et array
    let activityArr = [...await fetchData()];
    let amountOfActivities = 13;

    const activeActivities = [];
    for(i = 0; i < amountOfActivities; i++) {
        let listItem = [activityArr[i].timestamp, activityArr[i].classroom, activityArr[i].class, activityArr[i].name, activityArr[i].friendly_name];

        activeActivities.push(listItem)
    }

    return activeActivities;
};

//her laver vi vores view funktion
async function buildActivitiesView() {

    //her indsætter vi data'ene fra loadData funktionen i et array
    let activeActivities = [...await loadData()];
    
    //her deklererer vi en variabel som er vores activityWidget
    let activityWidget = document.querySelector("#activity-widget");

    //da der altid skal ligge en liste i toppen af widgeten, så indsætter vi den her.
    activityWidget.innerHTML = 
        `<li class="card">
            <p class="time">Tid</p> 
            <p class="location">Lokale</p> 
            <p class="class">Hold</p> 
            <p class="topic">Fag</p>
        </li>`;

    // Variabler til at undersøge om aktiviteten afvikles dagsdato eller senere
    let today = new Date(); // Dagsdato
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 24 timer fra nu
    let tomorrowMet = 0; // Sættes til 1 når første aktivitet fra senere er fundet

    // Arrays med navne på dage og måneder
    let days = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    let months = ['januar', 'febuar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    //da aktiviteterne ændrer sig iforhold til tiderne på dagen, så laves de her.
    for (item of activeActivities) {

        //her deklererer vi et par variabler
        let date = new Date(item[0] * 1000);
        let time = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
        let classs = `${item[2]}`;

        //dette gør at hvis der ikke findet et friendly_name så bruger den bare det normale name
        let topic = item[4];
            if (item[4] == '' || item[4] == null) {
                topic = item[3];
            }

        let classShorthands = ['we', 'ggr', 'agr', 'abi', 'gr', 'dm', 'mg', 'iw']; //array med forkortelser af navne for klasserne

        for (let i = 0; i < classShorthands.length; i++) {
            if(classs.search(classShorthands[i]) >= 0) {
                if (new Date(parseInt(item[0]) * 1000).getDate() >= tomorrow.getDate() && tomorrowMet == 0) { // Hvis aktivitets dato er lig med eller større end dato i morgen
                    let comingClassDay = new Date(item[0] * 1000); // Aktivites timestamp laves til dato

                    tomorrowMet = 1; // Sættes til 1 så if sætningens betingelser ikke mødes igen
                    activityWidget.innerHTML += 
                    `<li class="card">
                        <p class="">Næste skoledag - ${days[comingClassDay.getDay()]} d. ${comingClassDay.getDate()}. ${months[comingClassDay.getMonth()]}</p> 
                    </li>
                    <li class="card">
                        <p class="time ${classShorthands[i]}">${time}</p> 
                        <p class="location">${item[1]}</p> 
                        <p class="class">${classs}</p> 
                        <p class="topic">${topic}</p>
                    </li>`;
                } else {
                    activityWidget.innerHTML += 
                `<li class="card">
                    <p class="time ${classShorthands[i]}">${time}</p> 
                    <p class="location">${item[1]}</p> 
                    <p class="class">${classs}</p> 
                    <p class="topic">${topic}</p>
                </li>`;
                }
                break;
            };
        };
    };

    activityWidget.innerHTML += 
        `<li class="card">
            <p class="classes mg">Mediegrafiker</p>  
            <p class="classes dm">Digitale Medier</p>
            <p class="classes abi">AMU</p>
            <p class="classes we">Webudvikler</p>
            <p class="classes gr">Grafisk Tekniker</p>  
            <p class="classes iw">Anden Uddannelse</p>  
        </li>`;
};

featureCheck();

function featureCheck() {
    let onlineStatus = checkOnlineStatus(); // true = online, false = offline

    if (onlineStatus) { // Hvis online byg normal view
        buildActivitiesView();
        setTimeout(() => {buildActivitiesView()}, 60000);
    } else { // Hvis offline byg intet internet view
        noInternetView()
    }
}

function checkOnlineStatus() {
    if (window.navigator.onLine) { // Returner true hvis online
        return true;
    } else { // Ellers returner false
        return false;
    }
}

function noInternetView() {
    let activityWidget = document.querySelector("#activity-widget"); // Aktivitets widget container

    activityWidget.innerHTML = '<p>Intet internet, makker</p>'; // Html
}