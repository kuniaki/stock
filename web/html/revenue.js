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
  chartData.addColumn("number", "売上"); // total revenue
  chartData.addColumn("number", "売上総利益"); // gross profit
  chartData.addColumn("number", "営業利益"); // operating income
  chartData.addColumn("number", "純利益"); // net income
  // chartData.addColumn("number", "Total Revenue %"); // total revenue %

  for (let i = 0; i < result[term]["date"].length; i++) {
    chartData.addRow([
      result[term]["date"][i],
      parseInt(result[term]["total_revenue"][i]), // index 0
      parseInt(result[term]["gross_profit"][i]), // index 1
      parseInt(result[term]["operating_income"][i]), // index 2
      parseInt(result[term]["net_income"][i]), // index 3
      // parseFloat(result[term]["revenue_percentage"][i]), // index 4
      parseFloat(result[term]["gross_percentage"][i]), // index 4
      parseFloat(result[term]["operating_percentage"][i]), // index 5
      parseFloat(result[term]["net_percentage"][i]), // index 6
      
    ]);
  }

  var options = {
    title: `${term === "annual" ? "通期売上・利益率" : "四半期売上・利益率"}`,
    seriesType: "bars",
    series: {
      // 4: {
      //   type: "line",
      //   color: "red",
      //   targetAxisIndex: 1,
      // },
      // 4: {
      //   type: "line",
      //   color: ""
      // }
    },
    bar: {
      groupWidth: "75%",
    },
    hAxis: {
      direction: -1,
    },
    vAxes: {
      0: {
        // title: "Revenue",
      },
      1: {
        // title: "Percentage",
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
