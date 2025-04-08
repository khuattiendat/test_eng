const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const validate = require("../middlewares/validate");
const userRegisterRequest = require("../validators/UserRegisterRequest");
const userLoginRequest = require("../validators/UserLoginRequest");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
//
router.post("/refresh-token", authMiddleware, AuthController.refreshToken);
router.post("/logout", authMiddleware, AuthController.logout);
router.post("/register", validate(userRegisterRequest), AuthController.register);
router.post("/login", validate(userLoginRequest), AuthController.login);
module.exports = router;
