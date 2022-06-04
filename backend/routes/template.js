const path = require('path');
const express = require('express');
const multer = require('multer');
const Template = require('../models/Template');
const Router = express.Router();

const {
  getAllTemplates,
  getTemplate
} = require('../controllers/templateController');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files/templates');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/upload/template',
  upload.single('file'),
  async (req, res) => {
    try {
      const { templateName, description, deadline } = req.body;
      const { path, mimetype } = req.file;
      const file = new Template({
        templateName,
        description,
        deadline,
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

Router.get('/getAllTemplate', async (req, res) => {
  try {
    const files = await Template.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get('/download/template/:id', async (req, res) => {
  try {
    const file = await Template.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.route("/").get(getAllTemplates);
Router.route("/:id").get(getTemplate);

module.exports = Router;
