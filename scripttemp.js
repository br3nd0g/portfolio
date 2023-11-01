const builderHat = document.getElementById("builderHat");

const bruh = document.getElementById("bruh");

function getBruhXY() { 
    return [ bruh.offsetLeft, bruh.offsetTop]
}

function positionHat() {

    builderHat.style.position = "absolute";
    let leftTop = getBruhXY();
    leftTop[0] -= 35;
    leftTop[1] -= 82;

    builderHat.style.left = leftTop[0] + "px";
    builderHat.style.top = leftTop[1] + "px";
}

window.onresize = positionHat;

setTimeout(positionHat, 50)