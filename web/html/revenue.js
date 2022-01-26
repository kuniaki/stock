google.charts.load('current', { 'packages': ['corechart'] });

function getRevenueInfo() {
    $.ajax({
        // url: `//www.jenkins-asahi.com/api/v1/revenue?code=${code}&country=${countryc}`,
        url: '//www.jenkins-asahi.com/api/v1/revenue',
        type: 'GET',
        async: true,
        cashe: false,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (result) {
        revenueChart(result);
    }).fail(function (result) {
        alert('Failed to load the information');
        console.log(result)
    });
}

function revenueChart(result) {
    alert('on the right track!')
}