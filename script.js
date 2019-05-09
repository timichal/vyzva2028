const spreadsheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGvkeGjFDsFmY6D4WW0FKXq-Q45x-gdFe4A70m1uudmDsm4Vd_rkp3XxfDiqRrGkDgC0z19MWkwpsL/pubhtml";

function procSheet(page) {
  const data = {};
  data.lide = [];
  data.inst = [];

  const rows = page.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i].getElementsByTagName("td");
    const rowProcessed = [];
    for (let j = 1; j < row.length; j++) {
      rowProcessed.push(row[j].textContent);
    }
    console.log(rowProcessed);
    if (rowProcessed[0] === "sebe") data.lide.push([rowProcessed[1], rowProcessed[2]]);
    if (rowProcessed[0] === "instituci") data.inst.push([rowProcessed[1], rowProcessed[2]]);
  }

  function addToTable(arrName, reverse = false) {
    const div = document.getElementById(`sig-${arrName}`);
    data[arrName].forEach(([col1, col2]) => {
      const row1 = document.createElement("div");
      row1.className = "signature-name";
      row1.innerText = reverse ? col2 : col1;
      const row2 = document.createElement("div");
      row2.className = "signature-occup";
      row2.innerText = reverse ? col1 : col2;
      const signature = document.createElement("div");
      signature.className = "signature";
      signature.append(row1, row2);
      div.append(signature);
    });
  }

  addToTable("lide");
  addToTable("inst", true);
}

const xhr = new XMLHttpRequest();
xhr.open("GET", spreadsheet);
xhr.onload = () => procSheet(xhr.response);
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.responseType = "document";
xhr.send();
