// function getRevenueInfo() {

//   $.ajax({
//     url: `/api/v1/revenue?code=${$("#code").val()}&country=${$("#country").val()}`,
//     type: "GET",
//     async: true,
//     cashe: false,
//     dataType: "json",
//     contentType: "application/json",
//   })
//     .done(function (result) {
//       revenueChart(result);
//     })
//     .fail(function (result) {
//       alert("Failed to load the information");
//       console.log(result);
//     });
// }

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
  chartData.addColumn("number", "Total Revenue");
  chartData.addColumn("number", "Gross Profit");
  chartData.addColumn("number", "Operating Income");
  chartData.addColumn("number", "Net Income");
  chartData.addColumn("number", "Total Revenue %");

  for (let i = 0; i < result[term]["date"].length; i++) {
    chartData.addRow([
      result[term]["date"][i],
      parseInt(result[term]["total_revenue"][i]),
      parseInt(result[term]["gross_profit"][i]),
      parseInt(result[term]["operating_income"][i]),
      parseInt(result[term]["net_income"][i]),
      parseFloat(result[term]["revenue_percentage"][i]),
    ]);
  }

  var options = {
    title: `${term === "annual" ? "Annual" : "Quarterly"} Revenue Chart`,
    seriesType: "bars",
    series: {
      4: {
        type: "line",
        color: "red",
        targetAxisIndex: 1,
      },
    },
    bar: {
      groupWidth: "75%",
    },
    hAxis: {
      direction: -1,
    },
    vAxes: {
      0: {
        title: "Revenue",
      },
      1: {
        title: "Percentage",
        format: "percent",
      },
    },
    isStacked: false,
    width: 800,
    height: 400,
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
