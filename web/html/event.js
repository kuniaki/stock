google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function () {
  refreshDiv();
  console.log("running stock graph...");
  getStock();
  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
  }
  getRevenueInfo();
});

function refreshDiv() {
  console.log("refreshing segment graph...");
  $("#rsegment").load(window.location.href + " #rsegment");
}
