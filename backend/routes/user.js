const router = require("express").Router();


const {
  createUser,
  allUsers,
  deleteLoginMember,
  deleteLoginMember2,
  changePassword,
  login
} = require('../controllers/userController');


router.route("/add").post(createUser);
router.route("/login").get(allUsers);
router.route("/delete/:id").delete(deleteLoginMember);
router.route("/deleteByUserID/:userID").delete(deleteLoginMember2);
router.route("/changePassword/:userID").patch(changePassword);
router.post("/login", login);



module.exports = router;
