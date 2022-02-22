google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  // need to define a function to cleanup all html graph & tables
  //
  //
  //
  const infoPromised = getCompanyInfoPromise();
  const stockPromised = getStockPromise();

  Promise.all([infoPromised, stockPromised]).then(() => {
    infoPromised.done(infoPromiseDone);
    stockPromised.done(stockPromiseDone);
    console.log("\n!!!promises done!!!\n");
  });

  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
    show(".rsegment");
  } else {
    hide(".rsegment");
  }

  getRevenueInfo();
});
