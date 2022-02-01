google.charts.load("current", { packages: ["corechart"] });

$("#btn-getinfo").click(function (event) {
  event.preventDefault();
  refreshDiv();
  console.log("running stock graph...");
  getStock();
  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
  }
  //getRevenueInfo();
});

function refreshDiv() {
  console.log("refreshing all divs...");
  $("#append1year").load(window.location.href + " #append1year");
  $("#append5year").load(window.location.href + " #append5year");
  $("#rsegment").load(window.location.href + " #rsegment");
  $("#revenue").load(window.location.href + "#revenue");
}
