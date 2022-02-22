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
      console.log(result);
      fillInTable(result, code);
    })
    .fail(function (result) {
      alert("Failed to load the information");
      console.log(result);
    });
}

function fillInTable(result, code) {
  const rowHeader = document.querySelector("#company-name-code");
  const row1col1 = document.querySelector(".row-1.col-1");
  const row2col1 = document.querySelector(".row-2.col-1");
  const row3col1 = document.querySelector(".row-3.col-1");
  const row4col1 = document.querySelector(".row-4.col-1");

  rowHeader.textContent = `${code} ${result["会社情報"]}\n${result["英語社名"]}`;
  row1col1.textContent = result["概要"];
  row2col1.textContent = result["業種"];
  row3col1.textContent = result["テーマ"];
  row4col1.textContent = result["会社サイト"];
}
