const router = require("express").Router();


const {
  addStaffMember,
  getAllStaffMember,
  deleteStaffMember,
  getStaffMember,
  updateStaffMember
} = require('../controllers/staffController')



router.route("/").get(getAllStaffMember);
router.route("/registerStaffMember").post(addStaffMember);
router.route("/get/:id").get(getStaffMember);
router.route("/update/:id").put(updateStaffMember);
router.route("/delete/:id").delete(deleteStaffMember);


module.exports = router;
