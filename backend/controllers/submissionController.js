const mongoose = require('mongoose');
const Submission = require("../models/Submission");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllSubmissions = async (req, res) => {

    try {
        const files = await Submission.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of Topics. Try again later.');
    }
};

exports.getSubmission = catchAsyncErrors(async (req, res) => {
    let submissionId = req.params.id;

    try {
        Submission.findOne({ _id: submissionId }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
});