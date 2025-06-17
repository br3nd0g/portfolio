const projectButtonIDS = ['websites', 'data_science_and_scripts', 'fun_things']
let currentProjectType = "websites";
let projectsJson;
let currentProjectIndex = 0;
let currentProject;

let canSwitchProjectType = true;

const projectsCarousel = document.getElementById("projectsCarousel");

let projectImagePath = "./imagesNew/projectImages/";

function createElementFromHTML(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim(); // Remove whitespace
    return template.content.firstChild;
}

function loadProjects() {

    return new Promise(function (resolve, reject) {
        fetch('./projects.json')
        .then((response) => response.json())
        .then((json) => {resolve(json)});
    });
}

function setupProjects() {
    loadProjects().then((json) => {

        projectsJson = json;
        console.log(projectsJson);

        addInitialProject(true);
    });

    addProjectButtons();
}

function addInitialProject(isFirstProjectType){

    // get project json
    currentProject = projectsJson[currentProjectType][currentProjectIndex];

    // create html for project card
    const htmlToFill = createCard(currentProject.title, currentProject.description, currentProject.github, currentProject.liveLink, currentProject.image, currentProject.date);
    const newElement = createElementFromHTML(htmlToFill);

    const referenceChild = projectsCarousel.children[0];
    projectsCarousel.insertBefore(newElement, referenceChild.nextSibling);

    // add scroll effect to project image
    newElement.addEventListener('load', setupProjectImageScrollEffect, true);

    if(isFirstProjectType){
        // add functionality to carousel arrows
        setupSwitchButtons();
    }

    // add event listeners to project buttons
    let items = document.querySelectorAll(".websiteLink, .githubLink");

    items.forEach((item) => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add("pressable");
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("pressable");
        });
    });
}

function createProjectElement() {

    // get project json
    currentProject = projectsJson[currentProjectType][currentProjectIndex];

    // create html for project card
    const htmlToFill = createCard(currentProject.title, currentProject.description, currentProject.github, currentProject.liveLink, currentProject.image, currentProject.date);
    const newElement = createElementFromHTML(htmlToFill);

    return newElement;
}

function switchProject(event){

    canSwitchProjectType = false;

    const direction = event.target.id.replace('arrow', '').toLowerCase();

    disableSwitchButtons();

    if(direction === "left"){
        currentProjectIndex--;
        if(currentProjectIndex < 0){
            currentProjectIndex = projectsJson[currentProjectType].length - 1;
        }
    }else if(direction === "right"){
        currentProjectIndex++;
        if(currentProjectIndex >= projectsJson[currentProjectType].length){
            currentProjectIndex = 0;
        }
    }

    let previousProjectElement = document.getElementsByClassName("project")[0];

    const newElementToAdd = createProjectElement()
    const newElementCopy = newElementToAdd.cloneNode(true);

    newElementToAdd.style.position = "absolute";

    // positioning new element over previous element
    const prevRect = previousProjectElement.getBoundingClientRect();
    const carouselRect = projectsCarousel.getBoundingClientRect();
    const top = prevRect.top - carouselRect.top;
    const left = prevRect.left - carouselRect.left;
    newElementToAdd.style.top = `${top}px`;
    newElementToAdd.style.left = `${left}px`;

    // appending new element to carousel
    projectsCarousel.appendChild(newElementToAdd);

    // add scroll effect to project image
    setupProjectImageScrollEffect();

    if(direction === "left"){

        previousProjectElement.classList.add("slideOffRight");
        newElementToAdd.classList.add("slideInFromLeft");

    }else if(direction === "right"){

        previousProjectElement.classList.add("slideOffLeft");
        newElementToAdd.classList.add("slideInFromRight");

    }

    // remove previous project and re
    previousProjectElement.addEventListener('animationend', () => {
        previousProjectElement.remove();
        newElementToAdd.remove();

        const referenceChild = projectsCarousel.children[0];
        projectsCarousel.insertBefore(newElementCopy, referenceChild.nextSibling);
   
        // add scroll effect to project image
        setupProjectImageScrollEffect();

        // add event listeners to project buttons
        let items = document.querySelectorAll(".websiteLink, .githubLink");

        items.forEach((item) => {
            item.addEventListener("mouseover", () => {
                cursor.classList.add("pressable");
            });

            item.addEventListener("mouseleave", () => {
                cursor.classList.remove("pressable");
            });
        });

        setupSwitchButtons();
        canSwitchProjectType = true;
    });
}

function addProjectButtons(){

    let buttons = []

    projectButtonIDS.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            buttons.push(button);
        }
    });

    buttons.forEach(button => {
        button.onclick = (event) => switchProjects(event);
    });
}

function switchProjects(event) {

    if(!canSwitchProjectType) return;

    const buttonId = event.target.id;

    currentProjectType = buttonId;

    currentProjectIndex = 0; // reset to first project of the new type

    const previousProjectElement = document.getElementsByClassName("project")[0];
    previousProjectElement.remove();

    addInitialProject(false);

}

function createCard(title, description, githubLink, liveLink, imageName, date) {

    let html;

    if(liveLink){
        html = `
            <div class="project">
                <div class="projectLeft">

                    <h3 class="projectTitle">${title}</h3>
                    <p class="projectDescription">${description}</p>
                    <p class="projectDate">${date}</p>

                    <div class="projectLinks">
                        <a class="githubLink" target="_blank" href="${githubLink}"><img src="./imagesNew/gitIcon.png"></img></a>
                        <a class="websiteLink" target="_blank" href="${liveLink}"><img src="./imagesNew/linkIcon.png"></img></a>
                    </div>

                </div>

                <div class="projectRight">
                    <div class="projectImage">
                        <img src="${projectImagePath + imageName}">
                    </div>
                </div>
            </div>
        `
    }else{
        html = `
            <div class="project">
                <div class="projectLeft">

                    <h3 class="projectTitle">${title}</h3>
                    <p class="projectDescription">${description}</p>
                    <p class="projectDate">${date}</p>

                    <div class="projectLinks">
                        <a class="githubLink" target="_blank" href="${githubLink}"><img src="./imagesNew/gitIcon.png"></img></a>
                    </div>

                </div>

                <div class="projectRight">
                    <div class="projectImage">
                        <img src="${projectImagePath + imageName}">
                    </div>
                </div>
            </div>
        `
    }

    return html;
}

function setupProjectImageScrollEffect() {
    const projectImages = document.querySelectorAll('.projectImage');

    function updateImagePositions() {
        projectImages.forEach(container => {
            const img = container.querySelector('img');
            if (!img) return;

            const containerRect = container.getBoundingClientRect();
            const imgHeight = img.offsetHeight;
            const containerHeight = container.offsetHeight;
            const diff = imgHeight - containerHeight;

            if (diff <= 0) {
                img.style.top = '0px';
                return;
            }

            const windowHeight = window.innerHeight;
            const containerCenter = containerRect.top + containerHeight / 2;
            const screenCenter = windowHeight / 2;

            // Calculate scroll progress: 0 (top aligned) to 1 (bottom aligned)
            const start = containerRect.top - windowHeight + containerHeight;
            const end = containerRect.bottom;
            let progress = (containerCenter - screenCenter + windowHeight / 2) / (windowHeight - containerHeight);

            // Clamp progress between 0 and 1
            progress = Math.max(0, Math.min(1, progress));

            // Interpolate top position
            const top = (-diff * progress);
            img.style.top = `${top}px`;
        });
    }

    window.addEventListener('scroll', updateImagePositions);
    window.addEventListener('resize', updateImagePositions);
    updateImagePositions();
}

function setupSwitchButtons(){
    const arrowLeft = document.getElementById("arrowLeft");
    const arrowRight = document.getElementById("arrowRight");

    if (arrowLeft && arrowRight) {
        arrowLeft.addEventListener("click", switchProject);

        arrowRight.addEventListener("click", switchProject);
    }
}

function disableSwitchButtons() {
    const arrowLeft = document.getElementById("arrowLeft");
    const arrowRight = document.getElementById("arrowRight");

    if (arrowLeft && arrowRight) {
        arrowLeft.removeEventListener("click", switchProject);
        arrowRight.removeEventListener("click", switchProject);
    }
}


setupProjects();