const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const todoRoute = require("./routes/to-do")

async function db() {
    await connection();
  };
db();


  app.use(cors());
  
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  
  // middleware
  app.use(express.json());
  
  // Routes
app.use("/todo", todoRoute)

  // 404 error
app.use((req, res, next) => {
    res.status(404).json({
      message: "Ohh you are lost, go back now!!!!",
    });
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening carefully"));