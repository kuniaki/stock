$('#btn-getinfo').click(function(){
    var code = $('#code').val()
    var countryc =  $('#country').val()

    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    datee = day + '/' + month + '/' + year
    year5 = date.getFullYear() - 5;
    day1 = date.getDate()+1;
    dates = day1 + '/' + month + '/' + year5
    getInfo(code,dates,datee,countryc,mainChart);

    getRSegmentInfo();
})
