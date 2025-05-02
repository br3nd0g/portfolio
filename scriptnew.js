const whatIdo = ["a web developer", "a university student", " a software engineer", "always learning"]


function animateName(){
    const letters = Array.from(document.getElementsByClassName('animatedName'));

    letters.forEach((letter, index) => {
        letter.style.animation = `floatUpDown 2s ease-in-out infinite`;
        letter.style.animationDelay = `${index * 0.1}s`;
    });
}

function whatIdoText(){
    const widText = document.getElementById('widText');
    const things = whatIdo.length;
    let index = 0;

    function changeText() {


        widText.classList.remove('slideUp');
        void widText.offsetWidth; // trigger reflow 

        const h1 = document.createElement('h1');
        h1.className = 'slideAway changingText';
        h1.textContent = whatIdo[index === 0 ? things - 1 : index - 1];
        h1.style.position = 'absolute';

        const widTextRect = widText.getBoundingClientRect();
        h1.style.left = `${widTextRect.left + window.scrollX}px`;
        h1.style.top = `${widTextRect.top + window.scrollY}px`;

        document.body.appendChild(h1);

        setTimeout(() => {
            h1.remove();
        }, 700);

        widText.innerHTML = whatIdo[index];
        widText.classList.add('slideUp');
        
        if (index < things - 1) {
            index++;
        }
        else {
            index = 0;
        }
    }

    widText.innerHTML = whatIdo[index];
    index++;

    setInterval(changeText, 2500);
}

animateName();
whatIdoText();
