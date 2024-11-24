const express = require("express");
const userController = require("../Controllers/userController");
const checkDuplicateUser = require("../middleware/checkDuplicateUser");
const checkUserId = require("../middleware/ChekUSerId");
const authenticateUser = require("../middleware/Auth");

const router = express.Router();

router.post("/CreateUSer", checkDuplicateUser, userController.createUser);
router.get("/GetAllUsers", userController.getAllUsers);
router.get("/:id", checkUserId, userController.getUserById);
router.put("/:id", checkUserId, userController.updateUser);
router.delete("/:id", checkUserId, userController.deleteUser);

module.exports = router;
