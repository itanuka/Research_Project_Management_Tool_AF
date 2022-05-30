const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require("../models/User");

const dotenv = require('dotenv');
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

  User.findOne({ userID: req.body.userID },
    async function (err, result) {

      try {
        if (!result) {
          return res.status(500).json(err);
        } else {
         
          const isPasswordValid = await bcrypt.compare(
            req.body.password,
            result.password
          );

          if (isPasswordValid) {
            const token = jwt.sign(
              {
                userID: result.userID,
                role: result.role,
              },
              process.env.JWT_SECRET
            );
            return res.json({
              status: "ok",
              user: token,
              role: result.role,
              userID: result.userID,
              id: result._id,
            });
          } else {
            return res.json({ status: "PASSWORD INVALID", user: false });
          }
        }
      } catch (err) {
        console.error(err)
      }

    }
  );

});