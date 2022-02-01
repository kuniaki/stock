google.charts.load("current", { packages: ["corechart"] });

document.querySelector("btn-getinfo").addEventListener("click", function () {
  refreshDiv();
  getStock();
  if ($("#code").val() == 2502) {
    getRSegmentInfo();
  }
  getRevenueInfo();
});

function refreshDiv() {
  $("#append1year").load(window.location.href + " #append1year");
  $("#append5year").load(window.location.href + " #append5year");
  $("#rsegment").load(window.location.href + " #rsegment");
  $("#revenue").load(window.location.href + "#revenue");
}

function getStock() {
  var code = $("#code").val();
  var countryc = $("#country").val();

  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  datee = day + "/" + month + "/" + year;
  year5 = date.getFullYear() - 5;
  day1 = date.getDate();
  dates = day1 + "/" + month + "/" + year5;

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
  })
    .done(function (result) {
      mainChart(result);
    })
    .fail(function (result) {
      alert("Failed to load the information");
      console.log(result);
    });
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

function getRSegmentInfo() {
  $.ajax({
    url: "//www.jenkins-asahi.com/api/v1/rsegment",
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      rSegmentChart(result);
    })
    .fail(function (result) {
      alert("Failed to load the information");
      console.log(result);
    });
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

function getRevenueInfo() {
  var code = $("#code").val();
  var countryc = $("#country").val();

  $.ajax({
    url: `//www.jenkins-asahi.com/api/v1/revenue?code=${code}&country=${countryc}`,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      revenueChart(result);
    })
    .fail(function (result) {
      alert("Failed to load the information");
      console.log(result);
    });
}

function revenueChart(result) {
  console.log("on the right track!");
  var chartData = new google.visualization.DataTable();

  chartData.addColumn("string", "Date");
  chartData.addColumn("number", "Total Revenue");
  chartData.addColumn("number", "Gross Profit");
  chartData.addColumn("number", "Operating Income");
  chartData.addColumn("number", "Net Income");

  for (let i = 0; i < result["date"].length; i++) {
    chartData.addRow([
      result["date"][i],
      parseInt(result["total_revenue"][i]),
      parseInt(result["gross_profit"][i]),
      parseInt(result["operating_income"][i]),
      parseInt(result["net_income"][i]),
    ]);
  }

  var options = {
    title: "Annual Revenue Chart",
    bar: {
      groupWidth: "75%",
    },
    hAxis: {
      title: "年度",
      direction: -1,
    },
    isStacked: false,
    width: 800,
    height: 400,
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("revenue")
  );
  chart.draw(chartData, options);
}
