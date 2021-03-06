function getStockPromise() {
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  datee = day + "/" + month + "/" + year;
  year5 = date.getFullYear() - 5;
  day1 = date.getDate();
  dates = day1 + "/" + month + "/" + year5;

  return $.ajax({
    url:
      "/api/v1/stock?code=" +
      $("#code").val() +
      "&country=" +
      $("#country").val() +
      "&from_date=" +
      dates +
      "&to_date=" +
      datee,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  }).fail(function (result) {
    alert("Stock - Failed to load the information");
    console.log(result);
  });
}

const stockPromiseDone = function (result) {
  console.log("running stock graph...");
  mainChart(result);
};

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

  title = "??????:1??????";
  stepSize = 1000;

  var options = {
    title: title,
    titleTextStyle: {fontSize: 15},
    bar: {
      groupWidth: "100%",
    },
    hAxis: {
      stepSize: stepSize,
      format: "yy/MM/dd",
    },
    width: 600,
    height: 300,
    lineWidth: 1,
    curveType: "function",
    seriesType: "Line",
  };
  //???????????????
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

  title = "??????:5??????";
  stepSize = 1000;

  var options = {
    title: title,
    titleTextStyle: {fontSize: 15},
    bar: {
      groupWidth: "100%",
    },
    hAxis: {
      stepSize: stepSize,
      format: "yy/MM/dd",
      direction: -1,
    },
    width: 600,
    height: 300,
    lineWidth: 1,
    curveType: "function",
    seriesType: "Line",
  };
  //???????????????
  var chart = new google.visualization.ComboChart(
    document.getElementById("append5year")
  );
  chart.draw(chartData, options);
}

function mainChart(result) {
  main1years(result);
  main5years(result);
}
