let code;

function getCompanyInfoPromise() {
  code = $("#code").val();
  return $.ajax({
    url: `/api/v1/company_overview?code=${code}`,
    type: "GET",
    async: true,
    cashe: false,
    dataType: "json",
    contentType: "application/json",
  }).fail(function (result) {
    alert("Info - Failed to load the information");
    console.log(result);
  });
}

const infoPromiseDone = function (result) {
  console.log("loading company info...");
  fillInTable(result, code);
};

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

  show(".company-info");
}
