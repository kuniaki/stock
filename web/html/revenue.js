google.charts.load("current", { packages: ["corechart"] });

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

// function addRevenueChart(result, term, graph) {
//   var chartData = new google.visualization.DataTable();

//   chartData.addColumn("string", "Date");
//   chartData.addColumn("number", "Total Revenue");
//   chartData.addColumn("number", "Gross Profit");
//   chartData.addColumn("number", "Operating Income");
//   chartData.addColumn("number", "Net Income");

//   for (let i = 0; i < result[term]["date"].length; i++) {
//     chartData.addRow([
//       result[term]["date"][i],
//       parseInt(result[term]["total_revenue"][i]),
//       parseInt(result[term]["gross_profit"][i]),
//       parseInt(result[term]["operating_income"][i]),
//       parseInt(result[term]["net_income"][i]),
//     ]);
//   }

//   var options = {
//     title: `${term === "annual" ? "Annual" : "Quarterly"} Revenue Chart`,
//     bar: {
//       groupWidth: "75%",
//     },
//     hAxis: {
//       title: "年度",
//       direction: -1,
//     },
//     isStacked: false,
//     width: 800,
//     height: 400,
//   };

//   var chart = new google.visualization.ColumnChart(
//     document.getElementById(graph)
//   );
//   chart.draw(chartData, options);
// }

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
        targetAxisIndex: 1,
      },
    },
    bar: {
      groupWidth: "75%",
    },
    hAxis: {
      title: "年度",
      direction: -1,
    },
    vAxis: {
      0: { title: "need to confirm unit" },
      1: {
        title: "Percentage",
        format: "#%",
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
