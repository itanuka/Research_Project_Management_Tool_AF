const path = require('path');
const express = require('express');
const multer = require('multer');
const Submission = require('../models/Submission');
const Router = express.Router();

const {
    getAllSubmissions,
    getSubmission
} = require('../controllers/submissionController');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './files/submissions');
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
    '/upload/submission',
    upload.single('file'),
    async (req, res) => {
        try {
            const { templateId, templateName, deadline, groupName, submittedBy, groupID } = req.body;
            const { path, mimetype } = req.file;
            const file = new Submission({
                templateId,
                templateName,
                deadline,
                groupName,
                submittedBy,
                groupID,
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

Router.get('/getAllSubmission', async (req, res) => {
    try {
        const files = await Submission.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of files. Try again later.');
    }
});

Router.get('/download/submission/:id', async (req, res) => {
    try {
        const file = await Submission.findById(req.params.id);
        res.set({
            'Content-Type': file.file_mimetype
        });
        res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

Router.route("/").get(getAllSubmissions);
Router.route("/:id").get(getSubmission);

module.exports = Router;
