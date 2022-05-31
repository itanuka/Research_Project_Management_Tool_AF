const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  email:{
    type:String,
    
  },

  password: {
    type: String,
    required: true
  }
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
