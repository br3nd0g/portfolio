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
});

