import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

// Use cors middleware
app.use(cors());

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

// Fetch a company by ID
app.get("/companies/:id", async (req, res) => {
  const { id } = req.params;
  const company = await prisma.company.findUnique({
    where: { id: parseInt(id, 10) },
    include: { rows: true },
  });
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ error: "Company not found" });
  }
});

// Fetch all companies
app.get("/companies", async (req, res) => {
  const companies = await prisma.company.findMany({
    include: { rows: false },
  });
  res.json(companies);
});

// Add a row to a company
app.post("/companies/:id/rows", async (req, res) => {
  const { id } = req.params;
  console.log("POST /companies/:id/rows", {
    req,
    res,
  });
  const { name, url } = req.body;
  const row = await prisma.row.create({
    data: {
      name,
      url,
      companyId: parseInt(id, 10),
    },
  });
  res.json(row);
});

// app.get("/companies", async (req, res) => {
//   const companies = await prisma.company.findMany({
//     include: { rows: true },
//   });
//   res.json(companies);
// });

// app.post("/companies", async (req, res) => {
//   const { name } = req.body;
//   console.log("POST /companies", name);

//   const company = await prisma.company.create({
//     data: { name },
//   });
//   res.json(company);
// });
// app.get("/companies", async (req, res) => {
//   const companies = await prisma.company.findMany({
//     include: { rows: true },
//   });
//   res.json(companies);
// });
// app.get("/companies/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("GET /companies/:id", id);

//   const company = await prisma.company.findUnique({
//     where: { id: parseInt(id) },
//   });
//   res.json(company);
// });

// // Add route for adding a row
// // Add a row to a company
// app.post("/companies/:id/rows", async (req, res) => {
//   const { id } = req.params;
//   const { name, url } = req.body;
//   const row = await prisma.row.create({
//     data: {
//       name,
//       url,
//       companyId: parseInt(id, 10),
//     },
//   });
//   res.json(row);
// });
// app.post("/companies/:id/rows", async (req, res) => {
//   const { id } = req.params;
//   const { name, url } = req.body;

//   try {
//     const company = await prisma.company.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!company) {
//       return res.status(404).json({ error: "Company not found" });
//     }

//     const newRow = await prisma.row.create({
//       data: {
//         name,
//         url,
//         company: { connect: { id: company.id } },
//       },
//     });

//     res.status(201).json(newRow);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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
