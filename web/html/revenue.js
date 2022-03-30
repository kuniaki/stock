function getRevenuePromise() {
  return $.ajax({
    url: `/api/v1/revenue?code=${$("#code").val()}&country=${$(
      "#country"
    ).val()}`,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  }).fail(function (result) {
    alert("Revenue - Failed to load the information");
    console.log(result);
  });
}

function revenuePromiseDone(result) {
  console.log("running revenue graph...");
  revenueChart(result);
}

function addRevenueChart(result, term, graph) {
  var chartData = new google.visualization.DataTable();

  chartData.addColumn("string", "Date");
  chartData.addColumn("number", "売上(単位：億円)"); // total revenue
  chartData.addColumn("number", "%売上総利益"); // gross profit
  chartData.addColumn("number", "%営業利益"); // operating income
  chartData.addColumn("number", "%純利益"); // net income

  for (let i = 0; i < result[term]["date"].length; i++) {
    chartData.addRow([
      result[term]["date"][i],
      parseInt(result[term]["total_revenue"][i]) / 100, // index 0
      parseFloat(result[term]["gross_percentage"][i]), // index 1
      parseFloat(result[term]["operating_percentage"][i]), // index 2
      parseFloat(result[term]["net_percentage"][i]), // index 3
      
    ]);
  }

  var options = {
    title: `${term === "annual" ? "通期売上・利益率" : "四半期売上・利益率"}`,
    titleTextStyle: {fontSize: 15},
    seriesType: "bars",
    series: {
      1: {
        type: "line",
        color: "#6f9654",
        pointSize: 3,
        targetAxisIndex: 1,
      },
      2: {
        type: "line",
        color: "#e7711b",
        pointSize: 3,
        targetAxisIndex: 1,
      },
      3: {
        type: "line",
        color: "#f1ca3a",
        pointSize: 3,
        targetAxisIndex: 1,
      },
    },
    bar: {
      groupWidth: "60%",
    },
    hAxis: {
      direction: -1,
    },
    vAxes: {
      0: {
        // title: "Revenue",
        gridlines: {color: 'transparent'},
        format: "###,###,###,###,###",
      },
      1: {
        // title: "Percentage",
        gridlines: {color: 'transparent'},
        format: "percent",
      },
    },
    min: 0,
    isStacked: false,
    legend: {textStyle: {fontSize:10}},
    width: 600,
    height: 300,
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById(graph)
  );
  chart.draw(chartData, options);
}

function revenueChart(result) {
  addRevenueChart(result, "annual", "annual-revenue");
  addRevenueChart(result, "quarterly", "quarterly-revenue");
}
