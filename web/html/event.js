google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  // need to define a function to cleanup all html graph & tables
  //
  //
  //

  hide(".loading-message");

  const infoPromised = getCompanyInfoPromise();
  const stockPromised = getStockPromise();
  const segementPromised = getSegmentPromise();
  const revenuePromised = getRevenuePromise();

  Promise.all([
    infoPromised,
    stockPromised,
    segementPromised,
    revenuePromised,
  ]).then(() => {
    infoPromised.done(infoPromiseDone);
    stockPromised.done(stockPromiseDone);
    $("#code").val() == 2502
      ? segementPromised.done(segmentPromiseDone)
      : hide(".rsegment");
    revenuePromised.done(revenuePromiseDone);
    show(".loading-message");

    console.log("\n!!!promises done!!!\n");
  });
});
