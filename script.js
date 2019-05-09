const spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGvkeGjFDsFmY6D4WW0FKXq-Q45x-gdFe4A70m1uudmDsm4Vd_rkp3XxfDiqRrGkDgC0z19MWkwpsL/pubhtml";

function procSheet(page) {
  const data = {};
  data.lide = [];
  data.inst = [];

  const rows = page.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i].getElementsByTagName("td");
    const rowProcessed = [];
    for (let j = 1; j < rows.length; j++) {
      rowProcessed.push(row[j].textContent);
    }

    if (rowProcessed[0] === "člověka") data.lide.push([rowProcessed[1], rowProcessed[2]]);
    if (rowProcessed[0] === "instituci") data.inst.push([rowProcessed[1], rowProcessed[2]]);
  }

  function addToTable(arrName, reverse = false) {
    const table = document.getElementById(`${arrName}_table`);
    data[arrName].forEach(([col1, col2]) => {
      const nameTd = document.createElement("td");
      nameTd.innerText = reverse ? col2 : col1;
      const instTd = document.createElement("td");
      instTd.innerText = reverse ? col1 : col2;
      const Tr = document.createElement("tr");
      Tr.append(nameTd, instTd);
      table.parentNode.insertBefore(Tr, table.nextSibling);
    });
  }

  addToTable("lide");
  addToTable("inst", true);
}

const xhr = new XMLHttpRequest();
xhr.open("GET", spreadsheet);
xhr.onload = () => procSheet(xhr.response);
xhr.responseType = "document";
xhr.send();
