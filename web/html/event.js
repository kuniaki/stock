google.charts.load("current", { packages: ["corechart"] });
const segmentDiv = document.querySelector(".hidden");

$("#btn-getinfo").click(function () {
  console.log("loading company info...");
  getCompanyInfo();
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

function addSegment() {
  if (segmentDiv.classList.contains("hidden")) {
    console.log("...segment graph added...");
    segmentDiv.classList.remove("hidden");
  }
}

function removeSegment() {
  if (!segmentDiv.classList.contains("hidden")) {
    console.log("...segment graph removed...");
    segmentDiv.classList.add("hidden");
  }
}
