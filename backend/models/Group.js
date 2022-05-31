const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: {
        type: String,
        require: true,
    },
    firstMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    secondMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    thirdMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    fourthMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
