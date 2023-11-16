document.addEventListener('DOMContentLoaded', function () {
    const chart = Highcharts.chart('bubbleContainer', {
        chart: {
            type: 'packedbubble',
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