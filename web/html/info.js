function getCompanyInfo() {
  $.ajax({
    url: "/api/v1/company_overview",
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
