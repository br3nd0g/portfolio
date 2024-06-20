//morphing data from objects in to Highcharts-friendly data
const langCategories = [];
const langData = [];
const libraryCategories = [];
const libraryData = [];

for(let i=0;i < skillsObj.languages.length;i++) langCategories.push(skillsObj.languages[i].name);
for(let i=0;i < skillsObj.languages.length;i++) langData.push(skillsObj.languages[i].y);
for(let i=0;i < skillsObj["libraries/frameworks"].length;i++) libraryCategories.push(skillsObj["libraries/frameworks"][i].name);
for(let i=0;i < skillsObj["libraries/frameworks"].length;i++) libraryData.push(skillsObj["libraries/frameworks"][i].y);

// keeping chart global for reference in later function
var lalChart;


document.addEventListener('DOMContentLoaded', function () {

    const aoeChart = Highcharts.chart('bubbleContainer', {
        chart: {
            type: 'packedbubble',
            backgroundColor: null
        },

        accessibility: {
            enabled: false
        },
        tooltip: {
            enabled: false,
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },

        plotOptions: {
            packedBubble: {
                color: "#91C499",
            },
        },

        series: [{
            // specific options for this series instance
            name: 'Areas of Experience',
            data: skillsObj.areas,
            dataLabels: {
                enabled: true,
                format: "{point.name}"
            },
            minSize: '40%',
            maxSize: '120%',
            color: "#91C499",
        }]
    });

    // languages and libraries graph
    lalChart = remakeLALgraph(langCategories, langData);
});

function remakeLALgraph(ctgry, lalData){
    lalChart = Highcharts.chart('langBarGraph', {
        chart: {
            type: 'bar',
            backgroundColor: null
        },

        accessibility: {
            enabled: false
        },
        tooltip: {
            enabled: false,
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },

        xAxis: {
            categories: ctgry,
            labels: {
                align:'left',
                x:5,
                style: {
                    fontSize: '1em',
                    color:'#000'
                }
            },
            tickLength: 0,
            lineColor: '#595959',
           
        },
        yAxis: {
            allowDecimals:false,
            title: {
                text: 'Proficiency (out of 5)',
                style: {
                    fontSize:'12px',
                    fontWeight: 'bold' 
                }
            },
            min: 0,
            max: 5,
        },

        plotOptions: {
            bar: {
                borderRadiusTopLeft: '50%',
                borderRadiusTopRight: '50%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1,
                borderColor: "#595959",
            },
        },

        series: [{
            name: 'Languages Experience',
            data: lalData,
            color: "#91C499",
        }]
    });
}

function switchGraph(e){

    if(e.classList.contains("inactiveOption")){
        const librariesClicked = e.id === "librariesOption";

        if(librariesClicked){
            e.classList.remove("inactiveOption");
            document.getElementById("languagesOption").classList.add("inactiveOption");

            document.getElementById('langBarGraph').innerHTML = '';
            remakeLALgraph(libraryCategories, libraryData);

            // lalChart.xAxis[0].setCategories(libraryCategories);
            // lalChart.series[0].setData(libraryData);
            // lalChart.redraw();
        }
        else{
            e.classList.remove("inactiveOption");
            document.getElementById("librariesOption").classList.add("inactiveOption");

            document.getElementById('langBarGraph').innerHTML = '';
            remakeLALgraph(langCategories, langData);

            // lalChart.xAxis[0].setCategories(langCategories);
            // lalChart.series[0].setData(langData);
            // lalChart.redraw();
        }
    }
}