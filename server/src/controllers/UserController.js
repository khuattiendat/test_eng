const UserService = require("../services/UserServices");
const {responsiveApiSuccess} = require("../utils/responsiveApi");
const {ObjectId} = require("mongodb");

class UserController {

    async getAllUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const data = await UserService.getAllUsers(page);
            const {users, totalUsers, totalPages, currentPage} = data;
            res.status(200).json(responsiveApiSuccess('Lấy danh sách người dùng thành công', {
                users,
                totalUsers,
                totalPages,
                currentPage
            }));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            if (!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid or missing id'});
            }
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json(responsiveApiSuccess('Người dùng không tồn tại'));
            }
            res.status(200).json(responsiveApiSuccess('Lấy thông tin người dùng thành công', user));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(404).json(responsiveApiSuccess('Người dùng không tồn tại'));
            }
            const userId = user.id;
            const userProfile = await UserService.getUserById(userId);
            res.status(200).json(responsiveApiSuccess('Lấy thông tin người dùng thành công', userProfile));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async updateUserProfile(req, res) {
        try {
            const userId = req.user.id;
            const updatedUser = await UserService.updateUserProfile(userId, req.body);
            res.status(200).json(responsiveApiSuccess('Cập nhật thông tin người dùng thành công', updatedUser));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedUser = await UserService.updateUserProfile(userId, req.body);
            res.status(200).json(responsiveApiSuccess('Cập nhật thông tin người dùng thành công', updatedUser));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserService.deleteUser(userId);
            res.status(200).json(responsiveApiSuccess('Xóa người dùng thành công'));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }

    async searchUser(req, res) {
        try {
            const searchTerm = req.query.q || '';
            const page = parseInt(req.query.page) || 1;
            if (!searchTerm) {
                return res.status(400).json(responsiveApiSuccess('Thiếu thông tin tìm kiếm'));
            }
            const data = await UserService.searchUser(searchTerm, page);
            const {totalUsers, users, totalPages, currentPage} = data;
            res.status(200).json(responsiveApiSuccess('Tìm kiếm người dùng thành công', {
                users,
                totalUsers,
                totalPages,
                currentPage
            }));
        } catch (error) {
            res.status(500).json(responsiveApiSuccess(error?.message || 'Lỗi hệ thống'));
        }
    }
}

module.exports = new UserController();
