let Staff = require("../models/Staff");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// ADD STAFF MEMBER
exports.addStaffMember = catchAsyncErrors((req, res) => {

  const { name, idNumber, faculty, department, researchInterest, type, password } = req.body;

  const newStaffMember = new Staff({
    name,
    idNumber,
    faculty,
    department,
    researchInterest,
    type,
    password,
  });

  newStaffMember.save()
  res.json(newStaffMember)
});



// GET ALL STAFF MEMBERS
exports.getAllStaffMember = catchAsyncErrors(async (req, res) => {
  try {
    Staff.find({}, (err, result) => {
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


// DELETE STAFF MEMBER
exports.deleteStaffMember = catchAsyncErrors(async (req, res) => {
  let idNumber = req.params.id;

  try {
    Staff.deleteOne({ _id: idNumber }, (err, result) => {
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


// GET A STAFF MEMBER
exports.getStaffMember = catchAsyncErrors(async (req, res) => {
  let id = req.params.id;

  try {
    const staff = Staff.findOne({ _id: id }, (err, result) => {
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




// UPDATE STAFF MEMBER
exports.updateStaffMember = catchAsyncErrors(async (req, res) => {
  let staffMemberID = req.params.id;

  const { name, idNumber, faculty, department, researchInterest, type, password } = req.body;

  const updateStaffMember = {
    name,
    idNumber,
    faculty,
    department,
    researchInterest,
    type,
    password
  };

  Staff.updateOne({ _id: staffMemberID }, updateStaffMember, (err, result) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(result)
    }
  })

});


