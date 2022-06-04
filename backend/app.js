const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require('path');


const app = express();

app.use(cors());
app.use(bodyParser.json());


const UserRouter = require("./routes/user");
const StudentRouter = require("./routes/student");
const StaffRouter = require("./routes/staff");
const GroupRouter = require("./routes/group");
const studentRequestsRouter = require("./routes/studentRequests");
const topicRoute = require('./routes/topic');
const templateRoute = require('./routes/template')
const submissionRoute = require('./routes/submission')
const allocatedPanelMembers = require('./routes/allocatePanelMembers')

app.use("/api/v1/students", StudentRouter);
app.use("/api/v1/staff", StaffRouter);
app.use("/api/v1/groups", GroupRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/requests", studentRequestsRouter);
app.use("/api/v1/topics", topicRoute);
app.use("/api/v1/templates", templateRoute);
app.use("/api/v1/submissions", submissionRoute);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(topicRoute);
app.use(templateRoute);
app.use(submissionRoute);
app.use(allocatedPanelMembers);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
