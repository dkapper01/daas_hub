import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
// const cors = require("cors");

// Use cors middleware
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Start the server
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/companies", async (req, res) => {
  console.log("GET /companies");
  const companies = await prisma.company.findMany();
  res.json(companies);
});

app.post("/companies", async (req, res) => {
  const { name } = req.body;
  console.log("POST /companies", name);

  const company = await prisma.company.create({
    data: { name },
  });
  res.json(company);
});

app.get("/companies/:id", async (req, res) => {
  const { id } = req.params;
  console.log("GET /companies/:id", id);

  const company = await prisma.company.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(company);
});

// Add route for adding a row
app.post("/companies/:id/rows", async (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;
  console.log("POST /companies/:id/rows", id, name, url);

  const row = await prisma.row.create({
    data: {
      name,
      url,
      companyId: parseInt(id),
    },
  });
  res.json(row);
});

// Add route for deleting a row
app.delete("/rows/:rowId", async (req, res) => {
  const { rowId } = req.params;
  console.log("DELETE /rows/:rowId", rowId);

  const deletedRow = await prisma.row.delete({
    where: { id: parseInt(rowId) },
  });
  res.json(deletedRow);
});

// Add route for getting all rows
app.get("/rows", async (req, res) => {
  console.log("GET /rows");
  const rows = await prisma.row.findMany();
  res.json(rows);
});
