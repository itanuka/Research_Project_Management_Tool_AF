const { find } = require("../models/Group.js");
let Group = require("../models/Group.js");
const Student = require("../models/Student")

// Create Single Group 
exports.createGroup = async (req, res) => {

    const groupName = req.body.groupName;
    const firstMemberID = req.body.firstMemberID;
    const secondMemberID = req.body.secondMemberID;
    const thirdMemberID = req.body.thirdMemberID;
    const fourthMemberID = req.body.fourthMemberID;

    let firstMember = await Student.findOne({ idNumber: firstMemberID });
    let secondMember = await Student.findOne({ idNumber: secondMemberID });
    let thirdMember = await Student.findOne({ idNumber: thirdMemberID });
    let fourthMember = await Student.findOne({ idNumber: fourthMemberID });


    const newGroup = new Group({
        groupName,
        firstMember,
        secondMember,
        thirdMember,
        fourthMember,
    });

    newGroup.save()
    res.json(newGroup)
};


// Get All Groups
exports.getAllGroup = async (req, res) => {

    const result = await Group.find({}).populate([
        {
            path: "firstMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "secondMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "thirdMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "fourthMember",
            select: "idNumber",
            model: Student
        },
    ])
    console.log(result.groupName);
    res.json(result);
};


// Get SIngle Group
exports.getGroup = async (req, res) => {
    let groupId = req.params.id;

    const result = await Group.findOne({ _id: groupId }).populate([
        {
            path: "firstMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "secondMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "thirdMember",
            select: "idNumber",
            model: Student
        },
        {
            path: "fourthMember",
            select: "idNumber",
            model: Student
        },
    ])
    console.log(result.groupName);
    res.json(result);
};


// Update Single Group
exports.updateGroup = async (req, res) => {
    let groupId = req.params.id;

    const groupName = req.body.groupName;
    const firstMemberID = req.body.firstMemberID;
    const secondMemberID = req.body.secondMemberID;
    const thirdMemberID = req.body.thirdMemberID;
    const fourthMemberID = req.body.fourthMemberID;

    let firstMember = await Student.findOne({ idNumber: firstMemberID });
    let secondMember = await Student.findOne({ idNumber: secondMemberID });
    let thirdMember = await Student.findOne({ idNumber: thirdMemberID });
    let fourthMember = await Student.findOne({ idNumber: fourthMemberID });


    const updateGroup = {
        groupName,
        firstMember,
        secondMember,
        thirdMember,
        fourthMember,
    };


    try {
        Group.updateOne({ _id: groupId }, updateGroup, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
};

// Delete Single Group
exports.deleteGroup = async (req, res) => {
    let groupID = req.params.id;

    try {
        Group.deleteOne({ _id: groupID }, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
        })
    } catch (error) {
        console.error(error)
    }
};

/** @desc   update existing group so that supervisor, co-supervisor, and panel
 *          members can be added to the existing group
 * */
// @route UPDATE /api/v1/groups/updateWithStaff/:id
// @access private

exports.updateWithStaff = async (req, res) => {
    const groupId = req.params.id
    
    const supervisor = req.body.supervisor
    const co_supervisor = req.body.co_supervisor
    const panel_member = req.body.panel_member

    let updateInfo

    if(supervisor) {
        updateInfo = await Group.updateOne({_id: groupId},
            {
                $set: {
                    supervisor: supervisor
                }
            }
        )
    } else if(co_supervisor) {
        updateInfo = await Group.updateOne({_id: groupId},
            {
                $set: {
                    co_supervisor: co_supervisor
                }
            }
        )
    } else if(panel_member) {
        updateInfo = await Group.updateOne({_id: groupId},
            {
                $set: {
                    panel_member: panel_member
                }
            }
        )
    } else {
        updateInfo = {
            message: "No staff members were added to the group"
        }
    }

    res.status(201).json(updateInfo)
}