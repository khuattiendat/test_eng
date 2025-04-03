const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {responsiveApiSuccess, responsiveApiError} = require("../utils/responsiveApi");
const authService = require("../services/AuthService");

class AuthController {
    async register(req, res) {
        try {
            const data = await authService.register(req.body);
            console.log(data);
            res.status(201).json(responsiveApiSuccess("Tạo tài khoản thành công", data));
        } catch (error) {
            res.status(400).json(responsiveApiError(error.message));
        }
    }

    async login(req, res) {
        try {
            const data = await authService.login(req.body);
            const {refreshToken, accessToken} = data;
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            return res.status(200).json(responsiveApiSuccess("Đăng nhập thành công", {accessToken}));
        } catch (error) {
            res.status(400).json(responsiveApiError(error?.message || "Đã xảy ra lỗi khi đăng nhập!"));
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req?.cookies?.refreshToken;
            const data = await authService.refreshToken(refreshToken);
            return res.status(200).json(responsiveApiSuccess("Làm mới token thành công", data));
        } catch (error) {
            res.status(400).json(responsiveApiError(error?.message || "Đã xảy ra lỗi khi làm mới token!"));
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req?.cookies?.refreshToken;
            await authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json(responsiveApiSuccess("Đăng xuất thành công"));
        } catch (error) {
            res.status(400).json(responsiveApiError(error?.message || "Đã xảy ra lỗi khi đăng xuất!"));
        }
    }
}

module.exports = new AuthController();
