document
  .querySelector("news-delete-button")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let trace = 0;
    for (let row of document.querySelectorAll(".check")) {
      if (row.checked === true) {
        deleteTableRow("news-table", trace === 0 ? 0 : trace--);
      }
      trace++;
    }
  });

function deleteTableRow(tableid, rowNum) {
  const table = document.getElementById(tableid);
  table.deleteRow(rowNum);
}
