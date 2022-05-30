const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(bodyParser.json());


const LoginRouter = require("./routes/logins");
const StudentRouter = require("./routes/student");
const StaffRouter = require("./routes/staff");
const GroupRouter = require("./routes/group");



app.use("/api/v1/students", StudentRouter);
app.use("/api/v1/staff", StaffRouter);
app.use("/api/v1/logins", LoginRouter);
app.use("/api/v1/groups", GroupRouter);




module.exports = app;
