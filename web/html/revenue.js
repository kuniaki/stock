google.charts.load('current', { 'packages': ['corechart'] });

function getRevenueInfo() {

    var code = $('#code').val()
    var countryc = $('#country').val()

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
        console.log(result)
    });
}

function revenueChart(result) {
    alert('on the right track!')
}