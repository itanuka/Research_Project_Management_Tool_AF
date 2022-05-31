const router = require("express").Router();


const {
  registerStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudent,
  getStudentUsingUserID
} = require('../controllers/studentController');


router.route("/").get(getAllStudents);
router.route("/registerStudent").post(registerStudent);
router.route("/get/:id").get(getStudent);
router.route("/getStudentUsingUserID/:userID").get(getStudentUsingUserID);
router.route("/update/:id").put(updateStudent);
router.route("/delete/:id").delete(deleteStudent);



module.exports = router;
