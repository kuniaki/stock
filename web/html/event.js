google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  // need to define a function to cleanup all html graph & tables
  //
  //
  //

  console.log("loading company info...");
  getCompanyInfo();
  show("company-info");
  console.log("running stock graph...");
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

function show(identifier) {
  const div = document.querySelector(identifier);
  div.classList.remove("hidden");
  console.log(`...${identifier} added...`);
}

function hide(identifier) {
  const div = document.querySelector(identifier);
  div.classList.add("hidden");
  console.log(`...${identifier} added...`);
}
