const mongoose = require('mongoose');
const express = require('express');
const connectDB = require("./db_config/db");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: './public/' });
const DataController = require("./controller/dataController");
const FetchController = require("./controller/fetchController")
const app = express();
// const dataRoute = require("./routes/dataRoute");

dotenv.config({ path: ".env" });

connectDB();

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// app.post("/uploadData", upload.single("file"), DataController);
app.post("/uploadData", upload.any("file"), DataController);

app.get("/get_card_status", FetchController);

app.listen(3000, () => {
    console.log("listening on port 3000");
});