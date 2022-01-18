google.charts.load('current', {'packages':['corechart']});

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
function main1years(result) {
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
        for (var i = insertingData.length-1; i > insertingData.length -366; i--){
            ttt = insertingData[i];
            chartData.addRow(insertingData[i]);
        }
       
        title = "期間:1年間"
        stepSize = 1000

        var options = {
            title: title,
            bar: { 
                groupWidth: '100%' 
            },
            hAxis: {
                stepSize:stepSize,
                format: 'yy/MM/dd',
                direction: -1,
            },
            width: 1200,
            height: 400,
            lineWidth: 1,
            curveType: 'function',
            seriesType: "Line",  
        };
        //描画の処理
        var chart = new google.visualization.ComboChart(document.getElementById('append1year'));
        chart.draw(chartData, options);

}
 
function main5years(result) {
    var chartData = new google.visualization.DataTable();
        chartData.addColumn("string","day");
        chartData.addColumn("number","2502.T");
        chartData.addColumn("number","N225");
        date_d = result["date"]
        var length = date_d.length;
        close_d = result["close"]
        nikkei_d = result["nikkei"]
        var insertingData = new Array(length);

        baseClose  = close_d[0];
        baseNikkei = nikkei_d[0];

        let dClose = []
        for i in close_d:
          ff = float(i - baseClose)/float(baseClose) 
          dClose.push(ff)

        let dNikkei = []
        for i in nikkei_d:
          ff = float(i - baseNikkei)/float(baseNikkei) 
          dNikkei.push(ff)

        var dates = new Array();
        for(var s = 0; s < length; s++){
                dates[s] = String(date_d[s]);
        }

        for(var a = 0; a < length; a++){
      //    insertingData[a] = [dates[a],parseFloat(close_d[a]),parseFloat(nikkei_d[a])]
            insertingData[a] = [dates[a],parseFloat(dClose[a]),parseFloat(dNikkei[a])]
        }
        for (var i = insertingData.length-1; i > 0; i--){
            ttt = insertingData[i];
            chartData.addRow(insertingData[i]);
        }
       
        title = "期間:5年間"
        stepSize = 1000

        var options = {
            title: title,
            bar: { 
                groupWidth: '100%' 
            },
            hAxis: {
                stepSize:stepSize,
                format: 'yy/MM/dd',
                direction: -1,
            },
            width: 1200,
            height: 400,
            lineWidth: 1,
            curveType: 'function',
            seriesType: "Line",  
        };
        //描画の処理
        var chart = new google.visualization.ComboChart(document.getElementById('append5year'));
        chart.draw(chartData, options);

}

function mainChart(result){
   main1years(result)
   main5years(result)
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
