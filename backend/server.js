const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const app = express();

require("dotenv").config();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();

//routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/service", require("./routes/serviceRoutes"));
app.use("/api/billboard", require("./routes/billboardRoutes"));

const port = 5000;

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Example app listening on port ${port}!`)
);
