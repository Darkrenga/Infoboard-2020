loadingscreen();

buildfetch();

function buildfetch(){
    fetch('http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1')
    .then(res => res.json())
    .then((out) => {
        buildview(out);
        document.getElementById('loader').style.display = 'none';
    })
    .catch(err => { throw err });
}

function time2local(date, time){
    const currentTime = new Date().getTime();
    const dateParts = date.split('.');
    dateParts[2] = 20 + dateParts[2];
    const timeParts = time.split(':');
    const api_time = new Date(dateParts[2], dateParts[1]-1, dateParts[0], timeParts[0], timeParts[1], 0).getTime()/1000;
    const minutes = ((api_time - (currentTime/1000))/60).toFixed(0);
    return minutes;
}

function loadingscreen(){
    const loadingContainer = document.createElement('div');
    loadingContainer.setAttribute("id", "loader");

    loadingtext = document.createElement('h2');
    loadingtext.innerText="Loading data";
    loadingContainer.appendChild(loadingtext);
    
    loadingicon = document.createElement('img');
    loadingicon.src="../img/loading.svg";
    loadingContainer.appendChild(loadingicon);

    const post = document.getElementById('bus-post');
    post.appendChild(loadingContainer);
}

function buildview(out){
    const busContainer = document.createElement('div');
    busContainer.setAttribute("id", "bus-container");
    busContainer.classList.add('bus-container');

    const containerHeader = document.createElement('div');
    containerHeader.classList.add('container-header');
    busContainer.appendChild(containerHeader);

    const containerHeaderImg = document.createElement('img');
    containerHeaderImg.src = "../img/busser.png";
    containerHeader.appendChild(containerHeaderImg);

    const containerHeaderText = document.createElement('h2');
    containerHeaderText.innerHTML = "Bus tider";
    containerHeader.appendChild(containerHeaderText);

    const containerBody = document.createElement('div');
    containerBody.classList.add('container_body');

    for(let element of out.MultiDepartureBoard.Departure.slice(0,5)) {
        const minutes = time2local(element.date, element.time);

        if(minutes >= 0){
        const containerContent = document.createElement('div');
        containerContent.classList.add('container-content')
        containerBody.appendChild(containerContent);

        const containerBodyLine = document.createElement('h3');
        containerBodyLine.innerText = element.line;
        containerContent.appendChild(containerBodyLine);

        const containerBodydirection = document.createElement('h3');
        containerBodydirection.innerText = element.direction;
        containerContent.appendChild(containerBodydirection);

        const containerBodytime = document.createElement('h3');
        containerBodytime.innerText = `${minutes} Min`;
        containerContent.appendChild(containerBodytime);
    
        busContainer.appendChild(containerBody);
    }

    }

    const post = document.getElementById('bus-post');
    const old_child = document.getElementById('bus-container');

    if(old_child) {
        post.replaceChild(busContainer, old_child);
    } else {
        post.appendChild(busContainer);
    }
    reload();


}

function reload(){
    setTimeout(() => {
        buildfetch();
    }, 20000);
}

/*
Jannick er sej
Hilsen Daniel
*/
