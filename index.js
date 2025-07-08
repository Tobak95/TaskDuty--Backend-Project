require("dotenv").config;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

//middleware are functions that run on the server btw the req and res
app.use(express.json());
app.use(cors());
//its allow our server to have a req body

//Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome To Task Duty API" });
});

//Error Route : The error route will always be at the end of te app.get route so its wont run before other existing route

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Resource Not Found" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "task" });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database");
  }
};
startServer();
