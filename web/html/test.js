google.charts.load("current", { packages: ["corechart"] });

let code, countryc;
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let datee = day + "/" + month + "/" + year;
let year5 = date.getFullYear() - 5;
let day1 = date.getDate();
let dates = day1 + "/" + month + "/" + year5;

$(document).ready(function () {
  $("#btn-getinfo").on("click", function () {
    // store country and stock code
    code = $("#code").val();
    countryc = $("#country").val();

    // refresh each graph div
    refreshDiv();

    let promisedStock = promiseGetStock();
    let promisedSegment = promiseGetSegment();

    promisedStock.done(function (result) {
      mainChart(result);
    });
    promisedSegment.done(function (result) {
      rSegmentChart(result);
    });
  });
});

function promiseGetStock() {
  $.ajax({
    url:
      "//www.jenkins-asahi.com/api/v1/stock?code=" +
      code +
      "&country=" +
      countryc +
      "&from_date=" +
      dates +
      "&to_date=" +
      datee,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  });
}

function promiseGetSegment() {
  $.ajax({
    url: "//www.jenkins-asahi.com/api/v1/rsegment",
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  });
}

// $("#btn-getinfo").click(function () {
//   refreshDiv();
//   console.log("running stock graph...");
//   getStock();
//   if ($("#code").val() == 2502) {
//     console.log("running segment graph...");
//     getRSegmentInfo();
//   }
//   //getRevenueInfo();
// });

function refreshDiv() {
  console.log("refreshing all divs...");
  $("#append1year").load(window.location.href + " #append1year");
  $("#append5year").load(window.location.href + " #append5year");
  $("#rsegment").load(window.location.href + " #rsegment");
  $("#revenue").load(window.location.href + "#revenue");
}

function oneYearAgo() {
  date = new Date();
  year = date.getFullYear() - 1;
  month = date.getMonth() + 1;
  day = date.getDate();
  return year + "-" + month + "-" + day;
}

function normarize(dd, index_s, index_e) {
  let base = dd[index_s];
  let normarized = [];
  for (var i = index_s; i < index_e; i++) {
    var ll = dd[i];
    ff = (100 * parseFloat(ll - base)) / parseFloat(base);
    normarized.push(ff);
  }
  return normarized;
}

function main1years(result) {
  var chartData = new google.visualization.DataTable();
  chartData.addColumn("string", "day");
  chartData.addColumn("number", $("#code").val());
  chartData.addColumn("number", "N225");
  date_d = result["date"];
  var length = date_d.length;
  close_d = result["close"];
  nikkei_d = result["nikkei"];
  var insertingData = new Array(length);

  ////////////////////////////////////
  //                                //
  // Find the data of one year ago  //
  //                                //
  ///////////////////////////////////
  one_year_ago = oneYearAgo();
  oneYearD = new Date(one_year_ago);
  var term = 0; //246;
  oneYearUnix = Date.parse(oneYearAgo);
  for (var i = length - 1; i >= 0; i--) {
    dateD = new Date(date_d[i]);
    if (dateD <= oneYearD) {
      term = i;
      break;
    }
  }
  term = length - term;

  ////////////////////////////////////
  //                                //
  //   Normarized data              //
  //                                //
  ///////////////////////////////////
  let dClose = normarize(close_d, insertingData.length - term, length);
  let dNikkei = normarize(nikkei_d, insertingData.length - term, length);
  ////////////////////////////////////
  //                                //
  //   prepare 1 year data          //
  //                                //
  ///////////////////////////////////
  var dates = new Array();
  var k = 0;
  for (var s = insertingData.length - term; s < length; s++) {
    dates[k] = String(date_d[s]);
    k = k + 1;
  }

  for (var a = 0; a < term; a++) {
    insertingData[a] = [
      dates[a],
      parseFloat(dClose[a]),
      parseFloat(dNikkei[a]),
    ];
  }
  for (var i = 0; i < term; i++) {
    chartData.addRow(insertingData[i]);
  }

  title = "期間:1年間";
  stepSize = 1000;

  var options = {
    title: title,
    bar: {
      groupWidth: "100%",
    },
    hAxis: {
      stepSize: stepSize,
      format: "yy/MM/dd",
    },
    width: 1200,
    height: 400,
    lineWidth: 1,
    curveType: "function",
    seriesType: "Line",
  };
  //描画の処理
  var chart = new google.visualization.ComboChart(
    document.getElementById("append1year")
  );
  chart.draw(chartData, options);
}

function main5years(result) {
  var chartData = new google.visualization.DataTable();
  chartData.addColumn("string", "day");
  chartData.addColumn("number", $("#code").val());
  chartData.addColumn("number", "N225");
  date_d = result["date"];
  var length = date_d.length;
  close_d = result["close"];
  nikkei_d = result["nikkei"];
  var insertingData = new Array(length);

  let dClose = normarize(close_d, 0, length);
  let dNikkei = normarize(nikkei_d, 0, length);

  var dates = new Array();
  for (var s = 0; s < length; s++) {
    dates[s] = String(date_d[s]);
  }

  for (var a = 0; a < length; a++) {
    insertingData[a] = [
      dates[a],
      parseFloat(dClose[a]),
      parseFloat(dNikkei[a]),
    ];
  }
  for (var i = insertingData.length - 1; i > 0; i--) {
    chartData.addRow(insertingData[i]);
  }

  title = "期間:5年間";
  stepSize = 1000;

  var options = {
    title: title,
    bar: {
      groupWidth: "100%",
    },
    hAxis: {
      stepSize: stepSize,
      format: "yy/MM/dd",
      direction: -1,
    },
    width: 1200,
    height: 400,
    lineWidth: 1,
    curveType: "function",
    seriesType: "Line",
  };
  //描画の処理
  var chart = new google.visualization.ComboChart(
    document.getElementById("append5year")
  );
  chart.draw(chartData, options);
}

function mainChart(result) {
  main1years(result);
  main5years(result);
}

function rSegmentChart(result) {
  var chartData = new google.visualization.DataTable();
  chartData.addColumn("string", "年度");
  chartData.addColumn("number", "その他");
  chartData.addColumn("number", "食品");
  chartData.addColumn("number", "飲料");
  chartData.addColumn("number", "酒類");
  chartData.addColumn("number", "国際");
  var insertingData = new Array();

  year_d = result["year"];
  others_d = result["others"];
  food_d = result["food"];
  drink_d = result["drink"];
  alchohol_d = result["alcohol"];
  international_d = result["international"];
  var length = year_d.length;

  for (var a = 0; a < length; a++) {
    insertingData[a] = [
      year_d[a],
      parseInt(others_d[a]),
      parseInt(food_d[a]),
      parseInt(drink_d[a]),
      parseInt(alchohol_d[a]),
      parseInt(international_d[a]),
    ];
  }
  for (var i = insertingData.length - 1; i > 0; i--) {
    chartData.addRow(insertingData[i]);
  }
  var options = {
    title: "セングメント 通期売上",
    bar: {
      groupWidth: "75%",
    },
    hAxis: {
      title: "年度",
      direction: -1,
    },
    isStacked: true,
    width: 600,
    height: 400,
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("rsegment")
  );
  chart.draw(chartData, options);
}
