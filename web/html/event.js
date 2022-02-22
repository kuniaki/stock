google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  // need to define a function to cleanup all html graph & tables
  //
  //
  //
  let infoPromised = getCompanyInfo();
  infoPromised.done(infoPromiseDone);

  getStock();

  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
    show(".rsegment");
  } else {
    hide(".rsegment");
  }

  getRevenueInfo();
});
