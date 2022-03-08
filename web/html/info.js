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
  console.log(result);
  fillInOverview(result["overview"], code);
  fillInNews(result["news"], ".news-body", "news-table");
  fillInNews(result["disclosure"], ".disclosure-body", "disclosure-table");
  fillInCapital(result["capital"], ".capital-body");
  fillInNews(result["ulletnews"], ".ullet-news-body", "ullet-news-table");
  fillInNews(result["ulletfeeds"], ".ullet-feeds-body", "ullet-feeds-table");
  fillInStakeholder(result["ulletstakeholder"], ".ullet-stakeholder-fill");
  show(".company-info");
};

function fillInCapital(info, identifier) {
  const table = document.querySelector(identifier);
  table.innerHTML = "";
  for (const row of info) {
    table.insertAdjacentHTML("beforeend", row);
  }
}

function fillInNews(info, identifier, tableName) {
  const table = document.querySelector(identifier);
  table.innerHTML = "";
  // <td><input type="button" value="Delete" class="delete" onclick="deleteRow()"></td>
  for (let i = 0; i < info["date"].length && i < 10; i++) {
    const buttonHtml = `<td><input type="button" value="Delete" class="delete" onclick="deleteRow(${tableName}, ${i})"></td>`;
    const rowHtml = `<tr class="row-${i}">${buttonHtml}${info["date"][i]}${info["link"][i]}</tr>`;
    table.insertAdjacentHTML("beforeend", rowHtml);
  }
}

function fillInOverview(info, code) {
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

function fillInStakeholder(info, identifier) {
  const item = document.querySelector(identifier);
  item.innerHTML = "";
  item.insertAdjacentHTML(
    "beforeend",
    `<a class="ullet-stakeholder-link" href=${info}>Click here for more</a>`
  );
}

function deleteRow(tableName, index) {
  const table = document.getElementById(tableName);
  table.deleteRow(+index);
}
