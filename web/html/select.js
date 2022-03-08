const btnKabutanNewsDelete = document.getElementById("btn-kabutan-news-delete");
const btnKabutanDisDelete = document.getElementById("btn-kabutan-dis-delete");
const btnUlletNewsDelete = document.getElementById("btn-ullet-news-delete");
const btnUlletFeedsDelete = document.getElementById("btn-ullet-feeds-delete");

btnKabutanNewsDelete.addEventListener("click", function (e) {
  e.preventDefault();
  removeCheckbox(".kabutan-news-check", "news-table");
});

btnKabutanDisDelete.addEventListener("click", function (e) {
  e.preventDefault();
  removeCheckbox(".kabutan-dis-check", "disclosure-table");
});

btnUlletNewsDelete.addEventListener("click", function (e) {
  e.preventDefault();
  removeCheckbox(".ullet-news-check", "ullet-news-table");
});

btnUlletFeedsDelete.addEventListener("click", function (e) {
  e.preventDefault();
  removeCheckbox(".ullet-feeds-check", "ullet-feeds-table");
});

function removeCheckbox(boxId, tableClass) {
  let trace = 0;
  document.querySelectorAll(boxId).forEach((row) => {
    row.checked === true ? deleteTableRow(tableClass, trace) : trace++;
  });

  //   for (let row of document.querySelectorAll(boxId)) {
  //     if (row.checked === true) {
  //       deleteTableRow(tableClass, trace);
  //     } else {
  //       trace++;
  //     }
  //   }
}

function deleteTableRow(tableClass, rowNum) {
  const table = document.getElementById(tableClass);
  table.deleteRow(rowNum);
}
