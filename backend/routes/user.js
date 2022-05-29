const router = require("express").Router();


const {
  createLogin,
  allLogins,
  deleteLoginMember,
  deleteLoginMember2,
  login
} = require('../controllers/userController');


router.route("/add").post(createLogin);
router.route("/login").get(allLogins);
router.route("/delete/:id").delete(deleteLoginMember);
router.route("/deleteByUserID/:userID").delete(deleteLoginMember2);
router.post("/login", login);



module.exports = router;
