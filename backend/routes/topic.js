const path = require('path');
const express = require('express');
const multer = require('multer');
const Topic = require('../models/Topic');
const Group = require('../models/Group');
const Router = express.Router();

const {
  getAllTopics,
  getTopicUsingGroupID
} = require('../controllers/topicController');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files/topics');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|txt)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls, txt format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, groupName, submittedBy, groupID, status } = req.body;
      const { path, mimetype } = req.file;

      const group = await Group.findById(groupID);
      const file = new Topic({
        title,
        groupName,
        submittedBy,
        group,
        status,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await Topic.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await Topic.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.patch('/changeStatus/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    Object.assign(topic, req.body)
    topic.save();
    res.send(topic);
  } catch (error) {
    res.status(404).send({ error: "Topic is not found" });
  }
});

Router.route("/").get(getAllTopics);
Router.route("/getTopicUsingGroupID/:groupID").get(getTopicUsingGroupID);

module.exports = Router;
