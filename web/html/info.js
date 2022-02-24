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
  fillInOverview(result["overview"], code);
  fillInNews(result["news"]);
  show(".company-info");
};

function fillInNews(info) {
  const newsTable = document.querySelector(".news-body");
  for (let i = 0; i < info["date"].length; i++) {
    const rowHtml = `<tr>${info["date"][i]}${info["link"][i]}</tr>`;
    newsTable.insertAdjacentHTML("beforeend", rowHtml);
  }
}

function fillInOverview(info, code) {
  console.log();
  const rowHeader = document.querySelector("#company-name-code");
  const row1col1 = document.querySelector(".row-1.col-1");
  const row2col1 = document.querySelector(".row-2.col-1");
  const row3col1 = document.querySelector(".row-3.col-1");
  const row4col1 = document.querySelector(".row-4.col-1");

  rowHeader.textContent = `${code} ${info["会社情報"]}\n${info["英語社名"]}`;
  row1col1.textContent = info["概要"];
  row2col1.textContent = info["業種"];
  row3col1.textContent = info["テーマ"];
  row4col1.textContent = info["会社サイト"];
}
