const mongoose = require('mongoose');
const Template = require("../models/Template");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.getAllTemplates = async (req, res) => {

    try {
        const files = await Template.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of Topics. Try again later.');
    }
};

exports.getTemplate = catchAsyncErrors(async (req, res) => {
    let templateId = req.params.id;

    try {
        Template.findOne({ _id: templateId }, (err, result) => {
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