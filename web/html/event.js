$('#btn-getinfo').click(function () {
    refreshDiv();
    getStock();
    if ($("#code").val() == 2502) {
        getRSegmentInfo();
    }
    getRevenueInfo();
})

function refreshDiv() {
    $("#append1year").load(window.location.href + " #append1year");
    $("#append5year").load(window.location.href + " #append5year");
    $("#rsegment").load(window.location.href + " #rsegment");
    // $("#annual-revenue").load(window.location.href + "#annual-revenue");
}