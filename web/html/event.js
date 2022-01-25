$('#btn-getinfo').click(function () {

    getStock();
    if ($("#code").val() == 2502) {
        getRSegmentInfo();
    }
})
