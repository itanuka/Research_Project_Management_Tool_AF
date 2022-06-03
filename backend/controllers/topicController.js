const mongoose = require('mongoose');
const { find } = require("../models/Group.js");
const Topic = require("../models/Topic");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')



// Get All Topics
exports.getAllTopics = async (req, res) => {

    try {
        const files = await Topic.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of Topics. Try again later.');
    }
};

// get a topic using groupID
exports.getTopicUsingGroupID = catchAsyncErrors(async (req, res) => {
    // let studentUserID = req.params.userID;
    const groupID = req.params.groupID;
    var groupIDConverted = mongoose.Types.ObjectId(groupID);

    try {
        Topic.findOne({ group: groupIDConverted }, null, { sort: { createdAt: -1 } }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                // res.json(result)
                res.json(result);
            }
        })
    } catch (error) {
        console.error(error)
    }
});

