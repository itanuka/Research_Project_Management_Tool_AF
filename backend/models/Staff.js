const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  researchInterest: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
   
  },
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
