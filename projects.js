const projectButtonIDS = ['websites', 'data_science_and_scripts', 'fun_things']
let currentProjectType = "websites";
let projectsJson;
let currentProject;

const projectsCarousel = document.getElementById("projectsCarousel");

let projectImagePath = "./imagesNew/";

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

        currentProject = projectsJson[currentProjectType][0];

        const htmlToFill = createCard(currentProject.title, currentProject.description, currentProject.github, currentProject.liveLink, currentProject.image);
        projectsCarousel.innerHTML = htmlToFill;

        setupProjectImageScrollEffect();

        let items = document.querySelectorAll(".websiteLink, .githubLink");

        items.forEach((item) => {
            item.addEventListener("mouseover", () => {
                cursor.classList.add("pressable");
            });

            item.addEventListener("mouseleave", () => {
                cursor.classList.remove("pressable");
            });
        });
    });

    addProjectButtons();
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
    const buttonId = event.target.id;

    currentProjectType = buttonId;
}

function fillProjectCard(){

}

function createCard(title, description, githubLink, liveLink, imageName) {

    let html;

    if(liveLink){
        html = `
            <div class="project">
                <div class="projectLeft">

                    <h3 class="projectTitle">${title}</h3>
                    <p class="projectDescription">${description}</p>

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

                    <div class="projectLinks">
                        <a class="githubLink" href="${githubLink}"><img src="./imagesNew/gitIcon.png"></img></a>
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


setupProjects();