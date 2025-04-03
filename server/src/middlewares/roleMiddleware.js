const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
       allowedRoles = allowedRoles.flat();
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập vào tài nguyên này!",
                data: null,
                status: "error"
            });
        }
        next();
    };
};

module.exports = roleMiddleware;
// Compare this snippet from server/src/routes/authRouter.js: