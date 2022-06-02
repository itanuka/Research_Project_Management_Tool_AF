const router = require("express").Router();


const {
    createGroup,
    getAllGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    updateWithStaff,
    newChatMessage,
    getChatMessages,
    deleteChatMessage
} = require('../controllers/groupController');


router.route("/createGroup").post(createGroup);
router.route("/").get(getAllGroup);
router.route("/update/:id").put(updateGroup);
router.route("/delete/:id").delete(deleteGroup);
router.route("/get/:id").get(getGroup);
router.route("/updateWithStaff/:id").put(updateWithStaff);

router.route("/newChatMessage/:groupId").post(newChatMessage)
router.route("/getChatMessages/:groupId").get(getChatMessages)
router.route("/deleteChatMessage/:id").delete(deleteChatMessage)

module.exports = router;