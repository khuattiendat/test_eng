const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateAccessToken, generateRefreshToken} = require("../utils/jwt");

class AuthService {
    async register(data) {
        const userExit = await userRepository.findByEmail(data.email);
        if (userExit) {
            throw new Error("Email đã tồn tại!");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userRepository.create({
            ...data,
            role: "student",
            password: hashedPassword
        });
        return user;
    }

    async login(data) {
        if (!data) {
            throw new Error("Thiếu thông tin đăng nhập !!!");
        }
        const {email, password} = data;
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Tài khoản không tồn tại !!!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Mật khẩu không chính xác !!!");
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await userRepository.update(user._id, {refreshToken});
        return {accessToken, refreshToken};
    }

    async refreshToken(refreshToken) {

        if (!refreshToken) {
            throw new Error("Refresh token không tồn tại!");
        }

        // Kiểm tra refresh token trong database
        const user = await userRepository.getByRefreshToken(refreshToken);
        if (!user) {
            throw new Error("Refresh token không hợp lệ!");
        }
        let newAccessToken;

        // Xác thực refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                userRepository.update(user._id, {refreshToken: null});
                throw new Error("Refresh token đã hết hạn! Vui lòng đăng nhập lại.");
            }

            // Tạo Access Token mới
            newAccessToken = generateAccessToken(user);
        });
        return newAccessToken;
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw new Error("Refresh token không tồn tại!");
        }
        const user = await userRepository.getByRefreshToken(refreshToken);
        if (!user) {
            throw new Error("Refresh token không hợp lệ!");
        }
        await userRepository.update(user._id, {refreshToken: null});
    }
}

module.exports = new AuthService();
