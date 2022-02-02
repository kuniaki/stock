google.charts.load("current", { packages: ["corechart"] });

const segmentDiv = document.querySelector(".hidden");

$("#btn-getinfo").click(function () {
  // refreshDiv();
  console.log("running stock graph...");
  getStock();
  if ($("#code").val() == 2502) {
    console.log("running segment graph...");
    getRSegmentInfo();
    addSegment();
  } else {
    removeSegment();
  }
  getRevenueInfo();
});

// function refreshDiv() {
//   console.log("refreshing segment graph...");
//   $("#rsegment").load(window.location.href + " #rsegment");
// }

function addSegment() {
  console.log("...segment graph added...");
  segmentDiv.classList.remove("hidden");
}

function removeSegment() {
  console.log("...segment graph removed...");
  segmentDiv.classList.add("hidden");
}
