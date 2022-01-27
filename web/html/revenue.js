google.charts.load('current', { 'packages': ['corechart'] });

function getRevenueInfo() {
    var code = $('#code').val();
    var countryc = $('#country').val();

    $.ajax({
        url: `//www.jenkins-asahi.com/api/v1/revenue?code=${code}&country=${countryc}`,
        type: 'GET',
        async: true,
        cashe: false,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (result) {
        revenueChart(result);
    }).fail(function (result) {
        alert('Failed to load the information');
        console.log(result);
    });
}

function revenueChart(result) {
    console.log('on the right track!');
    var chartData = new google.visualization.DataTable();

    chartData.addColumn("string", "Date");
    chartData.addColumn("number", "Total Revenue");
    chartData.addColumn("number", "Gross Profit");
    chartData.addColumn("number", "Operating Income");
    chartData.addColumn("number", "Net Income");

    for (let i = 0; i < result['date'].length; i++) {
        chartData.addRow([result['date'][i], parseInt(result['total_revenue'][i]), parseInt(result['gross_profit'][i]), parseInt(result['operating_income'][i]), parseInt(result['net_income'][i])]);
    }

    var options = {
        title: 'Annual Revenue Chart',
        bar: {
            groupWidth: '75%'
        },
        hAxis: {
            title: '年度',
            direction: -1,
        },
        isStacked: false,
        width: 800,
        height: 400,
    }

    var chart = new google.visualization.ColumnChart(document.getElementById('revenue'));
    chart.draw(chartData, options);
}