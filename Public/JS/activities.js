fetchActivityData();
setTimeout(() => {fetchActivityData()}, 60000);

let activitiesContainer = document.querySelector('#activities-container');

function fetchActivityData() {
    fetch('https://api.mediehuset.net/infoboard/activities')
        .then(response => response.json())
        .then(data => handleActivityData(data.result))
        .catch(error => console.log('error', error));
}

function handleActivityData(allData) {
    let wantedData = [] // Array der skal indeholde objekter med ønsket data

    for (data of allData) {
        wantedData.push({name: data.name, friendly_name: data.friendly_name, class: data.class, classroom: data.classroom, timestamp: data.timestamp * 1000}); // Ønsket data pushes til wantedData
    }

    // let singleClassArray; // Variabel der midlertidigt vil holde arrays med klasser
    // let sortedArray = [] // Array der vil indeholde arrays sorteret efter klasser

    // while (wantedData.length > 0) { // Vi looper så længe der er indhold i array med ønsket data 
    //     let firstClassName = wantedData[0].class; // Navn på første klasse i array med ønsket data
    //     singleClassArray = wantedData.filter(d => d.class == firstClassName); // Finder alle objekter med samme klasse og tilføjer til arrayet singleClassArray
    //     singleClassArray.length = 2; // Fjerner alle objeter fra singleClassArray udover de to første
    //     sortedArray.push(singleClassArray); // Pusher singleClassArray ind i sortedArray
    //     wantedData = wantedData.filter(d => d.class !== firstClassName); // Finder alle objekter med samme klasse og fjerner disse fra arrayet wantedData 
    // }

    let sortedByDateArray = []; // Array der skal indeholde klasser sorteret efter dato
    let oneDateArray = []; // Array der bruges til at holde en datos klasser, inden de pushes til sortedByDateArray
    
    while (wantedData.length > 0) { // Vores data sorteres efter dato
        let firstDate = new Date(wantedData[0].timestamp).getDate(); // Første dato i array findes

        oneDateArray = wantedData.filter(d => new Date(d.timestamp).getDate() == firstDate) // Alle klasser med samme dato tilføjes
        wantedData = wantedData.filter(d => new Date(d.timestamp).getDate() !== firstDate) // Alle klasser med samme dato fjernes
        sortedByDateArray.push(oneDateArray) // Alle klasser med samme dato pushes til sortedByDateArray
    }

    let classesToShow = 2; // Antal klasser til hver uddannelse vi ønsker at vise
    let singleClassArray = []; // Array der bruges til at holde hver uddannelses klasser på den pågældende dato, inden de pushes til allClassesArray 
    let allClassesArray = []; // Array der der bruges til at holde alle uddannelsesers klasser på den pågældende dato, inden de pushes til sortedClassesArray
    let sortedClassesArray = []; // Array der skal indeholde info sorteret efter dato og klasser

    for (i = 0; i < sortedByDateArray.length; i++) { // Vi looper data inddelt efter dato for også at sortere efter klasse
        allClassesArray = []; // Nulstil allClassesArray
        while (sortedByDateArray[i].length > 0) { // Loop så længe der er indhold i sortedByDateArray[i]
            let firstClassName = sortedByDateArray[i][0].class; // Navnet på første klasse i array

            singleClassArray = sortedByDateArray[i].filter(d => d.class == firstClassName); // Alle klasser med samme navn tilføjes
            sortedByDateArray[i] = sortedByDateArray[i].filter(d => d.class !== firstClassName); // Alle klasser med samme navn fjernes
            singleClassArray.length = classesToShow; // Array forkortes ned, alt efter hvor mange klasser vi ønsker at vise til hver uddannelse

            if (allClassesArray[allClassesArray.length - 1] && singleClassArray[0].classroom == allClassesArray[allClassesArray.length - 1][0].classroom) { // Vi tjekker om forrige uddannelse foregår i samme lokale, hvis de gør tilføjes nuværende uddannelse klassenavn til forrige uddannelses klassenavn
                allClassesArray[allClassesArray.length - 1][0].class += ` & ${singleClassArray[0].class}`
            } else {
                allClassesArray.push(singleClassArray)
            }
        }

        let firstDateObject = {date: setDate(allClassesArray[0][0].timestamp), array: allClassesArray}; // Opretter objekt der består af dato og array med uddannelse der består af arrays med klasser på denne dato
        sortedClassesArray.push(firstDateObject);
    }

    buildActivityView(sortedClassesArray); // Vi kalder view med vores sorterede data
}

function setDate(timestamp) { // Returnerer dato som string
    const days = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    const months = ['januar', 'febuar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    return `${days[new Date(timestamp).getDay()]} d. ${new Date(timestamp).getDate()}. ${months[new Date(timestamp).getMonth()]}`
}


let showToday = true; // Viser kun første dato når denne er true. Viser alle datoer når denne er false

function buildActivityView(sortedData) {
    activitiesContainer.innerHTML = '';

    if (showToday == true) {
        let html = `<div><h2>${sortedData[0].date}</h2>`;
            
        sortedData[0].array.forEach(classInfo => {
            html += `<div class="${getShorthand(classInfo[0].class)}"><h3>${getClassTitle(getShorthand(classInfo[0].class))} - ${classInfo[0].class}</h3><p class="heading"><span>Tid</span><span>Lokale</span><span>Fag</span></p>${setClasses(classInfo)}</div>`;
    
        })
    
        html += `</div>`;
        activitiesContainer.insertAdjacentHTML('beforeend', html);
    } else {
        sortedData.forEach(dayInfo => {
            let html = `<div><h2>${dayInfo.date}</h2>`;
    
            dayInfo.array.forEach(classInfo => {
                html += `<div class="${getShorthand(classInfo[0].class)}"><h3>${getClassTitle(getShorthand(classInfo[0].class))} - ${classInfo[0].class}</h3>${setClasses(classInfo)}</div>`;
            })
    
            html += `</div>`;
            activitiesContainer.insertAdjacentHTML('beforeend', html);
        })
    }

    activitiesContainer.innerHTML += 
        `<li class="card">
            <p class="classes mg">Mediegrafiker</p>  
            <p class="classes dm">Digitale Medier</p>
            <p class="classes abi">AMU</p>
            <p class="classes we">Webudvikler</p>
            <p class="classes gr">Grafisk Tekniker</p>  
            <p class="classes iw">Anden Uddannelse</p>  
        </li>`;
}

function setClasses(classInfo) {
    let html = ''

    classInfo.forEach(info => {
        let className = info.friendly_name;
    
        if (className == '' || className == null) {
            className = info.name;
        }

        html += `<p><span>Kl. ${setTime(info.timestamp)}</span><span>${info.classroom}</span><span>${className}</span></p>`
    })

    return html;
}

function setTime(timestamp) {
    let date = new Date(timestamp);
    let time = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

    return time;
}

function getShorthand(className) {
    let classShorthands = ['we', 'ggr', 'agr', 'abi', 'gr', 'dm', 'mg', 'iw']; //array med forkortelser af navne for klasserne

    for (i = 0; i < classShorthands.length; i++) {
        if (className.search(classShorthands[i]) >= 0) {
            return classShorthands[i];
        }
    }
}

function getClassTitle(classShorthand) {
    switch (classShorthand) {
        case 'we':
            classTitle = 'Webudvikler';
            break;
        case 'ggr':
            classTitle = "Grafisk Tekniker";
            break;
        case 'agr':
            classTitle = "AMU";
            break;
        case 'abi':
            classTitle = "AMU";
            break;
        case 'gr':
            classTitle = "Grafisk Tekniker";
            break;
        case 'dm':
            classTitle = "Digital Media";
            break;
        case 'mg':
            classTitle = "Mediegrafiker";
            break;
        case 'iw':
            classTitle = "It, Web & Medier";
            break;
        default:
            classTitle = 'Ukendt udd.';
    }

    return classTitle;
}