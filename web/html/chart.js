google.charts.load('current', {'packages':['corechart']});

$('#btn-getinfo').click(function(){
    var code = $('#code').val()
    var dates = $('#start').val()
    var datee = $('#end').val()
    var countryc =  $('#country').val()
    var ds = dates.split('-'); 
    var de = datee.split('-'); 
    dates  = ds[2] + '/' +  ds[1] + '/' +  ds[0]
    datee  = de[2] + '/' +  de[1] + '/' +  de[0]


    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    datee = day + '/' + month + '/' + year
    year5 = date.getFullYear() - 5;
    day1 = date.getDate()+1;
    dates = day1 + '/' + month + '/' + year5

    getInfo(code,dates,datee,countryc,mainChart);
})

function getInfo(code,dates,datee,countryc,callback){
    $.ajax({
        url : '//www.jenkins-asahi.com/api/v1/stock?code=' + code + '&country='+ countryc  + '&from_date=' + dates + '&to_date=' + datee,
        type : 'GET',       
        async : true,        
        cashe : false,     
        dataType : 'json',  
        contentType : 'application/json' 
    }).done(function(result){ callback(result);
    }).fail(function(result){
        alert('Failed to load the information');
        console.log(result)
    });  
}

function mainChart(result){
    var chartData = new google.visualization.DataTable();
        chartData.addColumn("string","day");
        chartData.addColumn("number","2502.T");
        chartData.addColumn("number","N225");
        date_d = result["date"]
        var length = date_d.length;
        close_d = result["close"]
        nikkei_d = result["nikkei"]
        var insertingData = new Array(length);

        var dates = new Array();
        for(var s = 0; s < length; s++){
                dates[s] = String(date_d[s]);
        }

        for(var a = 0; a < length; a++){
            insertingData[a] = [dates[a],parseFloat(close_d[a]),parseFloat(nikkei_d[a])]
        }
        for (var i = insertingData.length-1; i > 0; i--){
            ttt = insertingData[i];
            chartData.addRow(insertingData[i]);
        }
/*
        options: {                             
                vAxis: {                      
                    display: true,             
                    ticks: {                    
                        min: -20,                
                        max: 80,              
                        fontSize: 18,        
                        stepSize: 5         
                    }
                },
                hAxis: {                  
                    display: true,        
                    ticks: {
                        fontSize: 18             
                        stepSize: 360            
                    }
                }
        };
        var options = {
            chartArea:{left:80,top:10,right:80,bottom:10},
            vAxis:{
                viewWindowMode:'maximized'
            },
            hAxis: {
                format: 'yy/MM/dd',
                direction: -1,
            },
            width: 600,
            height: 200,
            lineWidth: 1,
            seriesType: "line",  
            series: {
                1:{
                    type: "line",
                    color: 'green',
                },
                2:{
                    type: "line",
                    color: 'red',                
                },
                3:{
                    type: "line",
                    color: 'orange',                
                },
            } 
        };
          var options = {
                    title: "期間:5年間" 
                    ,width: "100%"
                    ,height: "100%"
                    ,series: [
                        { type: "line" }
                       ,{ type: "line" }
                    ]
                    ,vAxes: [
                        { title: "%",minValue:-20,maxValue:80 }
                   ]
                   ,hAxis: [{
                         format: 'yy/MM/dd',
                         direction: -1
                    }]

         };
*/
      var option = {
                     title: "期間:5年間" 
                    ,width: "100%"
                    ,height: "100%"
                    ,series: [
                        { type: "line", targetAxisIndex: 0 }
                       ,{ type: "line", targetAxisIndex: 0 }
                       ,{ type: "line", targetAxisIndex: 0 }
                    ]
                    ,vAxes: [
                        { title: "%" }
                   ]
       };
        //描画の処理
        var chart = new google.visualization.ComboChart(document.getElementById('appendMain'));
        chart.draw(chartData, options);
}

function volumeChart(volume, dates, length){
    var chartData = new google.visualization.DataTable();
    //出来高の値と日付のためのカラムを作成
    chartData.addColumn('string');
    chartData.addColumn('number');
    var insertingData = new Array();
    //配列insertingDataの中に、[日付、出来高]の形式でデータを入れ込む
    for(var a = 0; a < length; a++){
        insertingData[a] = [dates[a],parseInt(volume[a])]
    }
    //insertingDataの値をチャート描画用の変数に入れ込む
    for (var i = insertingData.length-1; i > 0; i--){
        chartData.addRow(insertingData[i]);
    }
    //ローソク足の時と同じように、見た目の設定をする
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
