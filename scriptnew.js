function animateName(){
    const letters = Array.from(document.getElementsByClassName('animatedName'));

    letters.forEach((letter, index) => {
        letter.style.animation = `floatUpDown 2s ease-in-out infinite`;
        letter.style.animationDelay = `${index * 0.1}s`;
    });
}

animateName();
