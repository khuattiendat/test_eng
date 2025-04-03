const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validate = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const userUpdateRequest = require("../validators/UserUpdateRequest");
//
router.get("/get-all", authMiddleware, UserController.getAllUsers);
router.get("/get-by-id/:id", authMiddleware, UserController.getUserById);
router.get("/profile", authMiddleware, UserController.getUserProfile);
router.get("/search", UserController.searchUser);
router.put('/update-profile', validate(userUpdateRequest), authMiddleware, UserController.updateUserProfile);
router.put("/update/:id", authMiddleware, roleMiddleware(["admin"]), validate(userUpdateRequest), UserController.updateUser);
router.delete("/delete/:id", authMiddleware, roleMiddleware(["admin"]), UserController.deleteUser);
module.exports = router;
