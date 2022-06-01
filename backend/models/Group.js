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

    /** 
     *  Each group should consist of supervisor, co-supervisor, and panel member, in addition to its group members
    */
     supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    co_supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    },
    panel_member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff"
    }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
