const skillsObj = {
    "libraries/frameworks": [
        {
            name: "Selenium",
            y: 2.5
        },
        {
            name: "Vue.js",
            y: 2
        },
        {
            name: "React.js",
            y: 3
        },
        {
            name: "Flask",
            y: 4
        },
        {
            name: "Pandas",
            y: 3.5
        },
        {
            name: "Numpy",
            y: 3
        },
        {
            name: "Matplotlib",
            y: 3
        },
        {
            name: "Highcharts",
            y: 3
        }
    ],
    languages: [
        {
            name: "JavaScript",
            y: 4,
            description: "I'm extremely familiar with JavaScript, having used it to create added functionality for many websites I have made, as well as using JavaScript libraries to create things such as games, visual art, or to add things such as the bubble chart above.",
            libraries: [
                "p5.js",
                "Highcharts",
                "Kaboom.js"
            ],
            cardPosition: 2
        },
        {
            name: "Python",
            y: 4,
            description: "I have used python for many of my projects.",
            libraries: [
                "Flask",
                "Pandas",
                "Matplotlib",
                "Seaborn"
            ],
            cardPosition: 1
        },
        {
            name: "Lua",
            y: 2,
            description: "",
            libraries: [

            ],
            cardPosition: 6
        },
        {
            name: "C++",
            y: 1,
            description: "",
            libraries: [

            ],
            cardPosition: 7
        },
        {
            name: "C#",
            y: 2.5,
            description: "",
            libraries: [

            ],
            cardPosition: 5
        },
        {
            name: "Node.js",
            y: 3.5,
            description: "",
            libraries: [

            ],
            cardPosition: 3
        },
        {
            name: "HTML/CSS",
            y: 4,
            description: "",
            libraries: [

            ],
            cardPosition: 4
        }
    ],
    areas: [
        {
            name: "Automation Testing",
            value: 1
        },
        {
            name: "Test2",
            value: 1
        },
        {
            name: "Test3",
            value: 2
        },
    ],
    interests: {
        "general": {

        },
        "currentlyLearning": {
            
        }
    }
};

let langCardPos = 1;
const langCarousel = document.getElementById("langCarousel");

function carouselSwitch(direction){
    
    if(direction === "right"){
        langCardPos += 1;
        if(langCardPos > skillsObj.languages.length){
            langCardPos = 1;
        }
    }else if(direction === "left"){
        langCardPos -= 1;
        if(langCardPos < 1){
            langCardPos = skillsObj.languages.length;
        }
    };

    const langObject = getLangObjFromPos();
    const langNode = createNewLangCard(langObject);

    langCarousel.removeChild(langCarousel.childNodes[2])

    langCarousel.insertBefore(langNode, langCarousel.childNodes[2]);

}

function getLangObjFromPos(){

    const languageObjects = skillsObj.languages
    const nextLangObj = (languageObjects.filter((language) => language.cardPosition === langCardPos))[0];

    return nextLangObj
}

function createNewLangCard(languageObj){

    let langCard = document.createElement('div');
    langCard.classList.add("langInfo")

    let htmlToInsert = `
        <h3>${languageObj.name}</h3>
        <p>${languageObj.description}</p>
    `;

    if(languageObj.libraries.length > 0){

        let langLibraries = ''

        for(let i = 0; i < languageObj.libraries.length; i++){
            langLibraries += ('<li>' + languageObj.libraries[i] + '</li>')
        }

        htmlToInsert += `
        <h4>Libraries/Frameworks: </h4>
        <ul class="libraryList">
            ${langLibraries}
        </ul>`
    }

    langCard.innerHTML = htmlToInsert;

    return langCard
}

document.addEventListener('DOMContentLoaded', () => {
    const firstLanguageObject = getLangObjFromPos();
    const firstLanguageNode = createNewLangCard(firstLanguageObject);
    langCarousel.insertBefore(firstLanguageNode, langCarousel.childNodes[2]);
})