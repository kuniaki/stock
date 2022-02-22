google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  // need to define a function to cleanup all html graph & tables
  //
  //
  //
  const infoPromised = getCompanyInfoPromise();
  infoPromised.done(infoPromiseDone);

  const stockPromised = getStockPromise();
  stockPromised.done(stockPromiseDone);

  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
    show(".rsegment");
  } else {
    hide(".rsegment");
  }

  getRevenueInfo();
});
