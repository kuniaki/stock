function getCompanyInfo() {
  var code = $("#code").val();

  $.ajax({
    url: `/api/v1/company_overview?code=${code}`,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      alert("Info - Successfully parsed!");
      console.log(result);
    })
    .fail(function (result) {
      alert("Failed to load the information");
      console.log(result);
    });
}
