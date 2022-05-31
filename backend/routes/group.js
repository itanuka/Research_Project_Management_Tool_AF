const router = require("express").Router();


const {
    createGroup,
    getAllGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    updateWithStaff,
} = require('../controllers/groupController');


router.route("/createGroup").post(createGroup);
router.route("/").get(getAllGroup);
router.route("/update/:id").put(updateGroup);
router.route("/delete/:id").delete(deleteGroup);
router.route("/get/:id").get(getGroup);
router.route("/updateWithStaff/:id").put(updateWithStaff);

module.exports = router;