const XLSX = require("xlsx");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//conversi file excel to json
const excelFileName = "HEADER.xlsx";
const workbook = XLSX.readFile(excelFileName);
const sheetName = workbook.SheetNames[0];
const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//get data product
app.get("/", (req, res) => {
  res.json(sheetData);
});

//get data product by id
app.get("/:id", (req, res) => {
  const idParam = parseInt(req.params.id);
  const result = sheetData.find((product) => product.NO === idParam);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//search data product
app.get("/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();

  const result = sheetData.filter(
    (product) =>
      (product.NAMA && product.NAMA.toLowerCase().includes(query)) ||
      (product.KODE && product.KODE.toLowerCase().includes(query)) ||
      (product.SUMBER && product.SUMBER.toLowerCase().includes(query))
  );

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Data not found" });
  }

});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
