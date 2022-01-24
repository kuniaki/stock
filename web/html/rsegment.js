google.charts.load('current', {'packages':['corechart']});

function getRSegmentInfo(){
    $.ajax({
        url : '//www.jenkins-asahi.com/api/v1/rsegment',
        type : 'GET',       
        async : true,        
        cashe : false,     
        dataType : 'json',  
        contentType : 'application/json' 
    }).done(function(result){ rSegmentChart(result);
    }).fail(function(result){
        alert('Failed to load the information');
        console.log(result)
    });  
}

function rSegmentChart(result){
    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string');
    chartData.addColumn('number');
    var insertingData = new Array();
    for(var a = 0; a < length; a++){
        insertingData[a] = [dates[a],parseInt(volume[a])]
    }
    for (var i = insertingData.length-1; i > 0; i--){
        chartData.addRow(insertingData[i]);
    }
    var options = {
        chartArea:{left:80,top:10,right:80,bottom:80},
        colors: ['#003A76'],
        legend: {
            position: 'none',
        },
        bar: { 
            groupWidth: '100%' 
        },
        hAxis: {direction: -1},
        width: 1200,
        vAxis:{
            viewWindowMode:'maximized'
        },
    }
    var chart = new google.visualization.ColumnChart(document.getElementById('appendVolume'));
    chart.draw(chartData, options);
}
