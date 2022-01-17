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
    }).done(function(result){
        callback(result);
    }).fail(function(result){
        alert('Failed to load the information');
        console.log(result)
    });  
}

function mainChart(result){
    //チャートに描画するための最終的なデータを入れる
    var chartData = new google.visualization.DataTable();
        //日付ようにString型のカラムを一つ、チャート描画用に数値型のカラムを７つ作成
        chartData.addColumn('string');
        for(var x = 0;x < 2; x++){
            chartData.addColumn('number');
        }
        //いちいち書くのが面倒なので、取得した情報の長さを配列に入れる
        date_d = result["date"]
        var length = date_d.length;
        close_d = result["close"]
        nikkei_d = result["nikkei"]
        //描画用のデータを一時的に入れる
        var insertingData = new Array(length);

       //チャートの日付を保持する配列
        var dates = new Array();
        for(var s = 0; s < length; s++){
                dates[s] = String(date_d[s]);
        }

        //配列insertingDataの中に、[終値]の形で値を入れ込む
        for(var a = 0; a < length; a++){
            insertingData[a] = [dates[a],parseFloat(close_d[a]),parseFloat(nikkei_d[a])]
        }
        //チャート描画用の配列の中に、insertingDataの値を入れ込む
        for (var i = insertingData.length-1; i > 0; i--){
            ttt = insertingData[i];
            chartData.addRow(insertingData[i]);
        }
        //チャートの見た目に関する記述、詳細は公式ドキュメントをご覧になってください
        var options = {
            chartArea:{left:80,top:10,right:80,bottom:10},
            colors: ['#003A76'],
            legend: {
                position: 'none',
            },
            vAxis:{
                viewWindowMode:'maximized'
            },
            hAxis: {
                format: 'yy/MM/dd',
                direction: -1,
            },
            bar: { 
                groupWidth: '100%' 
            },
            width: 1200,
            height: 400,
            lineWidth: 1,
            curveType: 'function',
            //チャートのタイプとして、ローソク足を指定
      //    seriesType: "candlesticks",  
            seriesType: "line",  
            //ローソク足だでなく、線グラフも三種類表示することを記述
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
