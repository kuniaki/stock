function getRSegmentInfo() {
  //   var that = $(this);
  //   that.off("click");

  $.ajax({
    url: "/api/v1/rsegment",
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      rSegmentChart(result);
    })
    // .always(function () {
    //   that.on("click", getRSegmentInfo);
    // })
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
    document.querySelector(".rsegment")
  );
  chart.draw(chartData, options);
}
