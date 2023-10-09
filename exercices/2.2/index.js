let counter = 0;
const counterHTML = document.querySelector('#counter');
const msg = document.querySelector('#msg');

window.addEventListener('click', () => {
    counter++;
    counterHTML.innerHTML = counter;
    if(counter === 5){
        msg.innerHTML = "Bravo, bel échauffement";
    }
    if(counter === 10) msg.innerHTML = "Vous êtes passé maître en l'art du clic";
});