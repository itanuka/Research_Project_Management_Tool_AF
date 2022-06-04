const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require("../models/User");
const Student = require("../models/Student");
const Staff = require("../models/Staff");


const dotenv = require('dotenv');
const Group = require("../models/Group");
dotenv.config({ path: 'config/config.env' });




// CREATE MEMBER LOGIN
exports.createUser = catchAsyncErrors(async (req, res) => {
  try {
    const userID = req.body.userID;
    const password = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role;

    const newUser = new User({
      userID,
      password,
      role,
    });

    newUser.save()
    res.status(200)
  } catch (error) {
    console.log(error);
  }
});



// GET ALL LOGINS
exports.allUsers = catchAsyncErrors((req, res) => {

  User.find({}, (err, result) => {
    if (err)
      res.json(err)
    else
      res.json(result)
  })
});



// DELETE LOGGED IN MEMBER
exports.deleteLoginMember = catchAsyncErrors(async (req, res) => {
  let id = req.params.id;

  try {
    await User.deleteOne({ _id: id }, (err, result) => {
      if (err)
        res.status(500).json(err)
      else
        res.json(result)
    })
  } catch (error) {
    console.error(error)
  }

});



// DELETE MEMBER
exports.deleteLoginMember2 = catchAsyncErrors(async (req, res) => {

  let userID = req.params.userID;

  User.deleteOne({ _id: userID }, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }
  })

});




// LOGIN 
exports.login = catchAsyncErrors(async (req, res) => {

  const user = await User.findOne({ userID: req.body.userID });
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if (isPasswordValid) {
    let token;
    let userObectID = "";
    let userID = "";
    let groupID = "";
    let groupName = "";


    if (user.role == 'student') {
      const student = await Student.findOne({ idNumber: user.userID });
      userObectID = student._id.toString();
      userID = student.idNumber;

      var userObectIDConverted = mongoose.Types.ObjectId(userObectID);

      let group = await Group.findOne({ firstMember: userObectIDConverted }).select('groupName');
      if (!group) {
        group = await Group.findOne({ secondMember: userObectIDConverted }).select('groupName');
      }
      if (!group) {
        group = await Group.findOne({ thirdMember: userObectIDConverted }).select('groupName');
      }
      if (!group) {
        group = await Group.findOne({ fourthMember: userObectIDConverted }).select('groupName');
      }
      if (group) {
        groupID = group._id.toString();
        groupName = group.groupName;

        token = jwt.sign(
          {
            userObectID: userObectID,
            userID: userID,
            role: user.role,
            groupID: groupID,
            groupName: groupName
          },
          process.env.JWT_SECRET
        );
      }
      else {
        token = jwt.sign(
          {
            userObectID: userObectID,
            userID: userID,
            role: user.role,
          },
          process.env.JWT_SECRET
        );
      }

    }
    else {
      const staff = await Staff.findOne({ idNumber: user.userID });
      userObectID = staff._id.toString();
      userID = staff.idNumber;

      token = jwt.sign(
        {
          userObectID: userObectID,
          userID: userID,
          role: user.role,
        },
        process.env.JWT_SECRET
      );


    }


    return res.json({
      status: "ok",
      user: token,
      userObectID: userObectID,
      userID: userID,
      role: user.role,
     
    });
  }
  else {
    return res.json({ status: "PASSWORD INVALID", user: false });
  }



});