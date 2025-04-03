const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục!",
            data: null,
            status: "error"
        });
    }

    try {
        req.user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn!",
            data: null,
            status: "error"
        });
    }
};

module.exports = authMiddleware;
