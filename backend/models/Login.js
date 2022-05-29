const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  userID: {
    type: String
    
  },
  password: {
    type: String
    
  },
  role: {
    type: String
   
  },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
