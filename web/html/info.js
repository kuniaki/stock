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
  fillInOverview(result["overview"], result["ulletstakeholder"], ".overview-body", code);
  fillInNews(result["news"], ".news-body", "kabutan-news-check");
  fillInNews(result["disclosure"], ".disclosure-body", "kabutan-dis-check");
  fillInCapital(result["capital"], ".capital-body");
  fillInNews(result["ulletnews"], ".ullet-news-body", "ullet-news-check");
  fillInNews(result["ulletfeeds"], ".ullet-feeds-body", "ullet-feeds-check");
  // fillInStakeholder(result["ulletstakeholder"], ".ullet-stakeholder-fill");
  show(".company-info");
};

function fillInCapital(info, identifier) {
  const table = document.querySelector(identifier);
  table.innerHTML = "";
  for (const row of info) {
    table.insertAdjacentHTML("beforeend", row.replace("href", `target="_blank" href`));
  }
}

function fillInNews(info, identifier, className) {
  const table = document.querySelector(identifier);
  table.innerHTML = "";
  for (let i = 0; i < info["date"].length && i < 10; i++) {
    const checkbox = `<td><input class="${className}" type="checkbox" name="row${i}" value=${i}></td>`;
    const rowHtml = `<tr>${checkbox}${info["date"][i]}${info["link"][i].replace("href", `target="_blank" href`)}</tr>`;
    table.insertAdjacentHTML("beforeend", rowHtml);
  }
}

function fillInOverview(info, stakeinfo, identifier, code) {
  const table = document.querySelector(identifier);
  const tableTitle = document.querySelector(".overview-title");

  table.innerHTML = "";
  tableTitle.innerHTML = `${code} ${info["会社情報"]}\n${info["英語社名"]}<h5 class="overview-data">時価総額: ${info["時価総額"]}</h5><h5 class="overview-data">PER(予): ${info["PER"]}</h5>`;
  table.insertAdjacentHTML(
    "beforeend",
    `<tr class="overview"><td>概要</td><td>${info["概要"]}</td></tr>`
  );
  table.insertAdjacentHTML(
    "beforeend",
    `<tr class="overview"><td>業種</td><td>${info["業種"]}</td></tr>`
  );
  table.insertAdjacentHTML(
    "beforeend",
    `<tr class="overview"><td>企業サイト</td><td><a target="_blank" rel="noopener noreferrer" href="${info["会社サイト"]}">${info["会社サイト"]}</a></td></tr>`
  );
  table.insertAdjacentHTML(
    "beforeend", 
    `<tr class="overview"><td>役員構成</td><td><a class="ullet-stakeholder-link" target="_blank" rel="noopener noreferrer" href=${stakeinfo}>${stakeinfo}</a></td></tr>`
  );
}

function fillInStakeholder(info, identifier) {
  const item = document.querySelector(identifier);
  item.innerHTML = "";
  item.insertAdjacentHTML(
    "beforeend",
    `<a class="ullet-stakeholder-link" target="_blank" rel="noopener noreferrer" href=${info}>Click here for more</a>`
  );
}
