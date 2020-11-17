let menuBtns = [...document.querySelectorAll(".menuButton")];
let sections = [...document.querySelectorAll(".pageSection")];

for (let i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener('click', () => {
        if(i == 0) {
            let f = 1, l = 2; 
            toggleClassSection(i, f, l);
            toggleClassButtons(i, f, l);
        }
        else if(i == 1) {
            let f = 2, l = 0;
            toggleClassSection(i, f, l);
            toggleClassButtons(i, f, l);
        }
        else if(i == 2) {
            let f = 0, l = 1;
            toggleClassSection(i, f, l);
            toggleClassButtons(i, f, l);
        }
    });
}

function toggleClassSection(i, f, l) {
    sections[i].classList.add('active');
    sections[f].classList.remove('active');
    sections[l].classList.remove('active');
}

function toggleClassButtons(i, f, l) {
    menuBtns[i].classList.add('active');
    menuBtns[f].classList.remove('active');
    menuBtns[l].classList.remove('active');
}