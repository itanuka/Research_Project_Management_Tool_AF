const router = require("express").Router();


const {
  addStaffMember,
  getAllStaffMember,
  deleteStaffMember,
  getStaffMember,
  getStaffUsingUserID,
  updateStaffMember
} = require('../controllers/staffController')



router.route("/").get(getAllStaffMember);
router.route("/registerStaffMember").post(addStaffMember);
router.route("/get/:id").get(getStaffMember);
router.route("/getStaffUsingUserID/:userID").get(getStaffUsingUserID);
router.route("/update/:id").put(updateStaffMember);
router.route("/delete/:id").delete(deleteStaffMember);


module.exports = router;
