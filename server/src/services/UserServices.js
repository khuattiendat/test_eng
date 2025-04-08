const UserRepository = require("../repositories/UserRepository");
const dotenv = require("dotenv");
const {responsiveApiSuccess} = require("../utils/responsiveApi");
const examRepository = require("../repositories/ExamRepository");
dotenv.config();
const PAGE_SIZE = process.env.PAGE_SIZE || 10;

class UserService {

    async getAllUsers(page = 1) {
        const limit = PAGE_SIZE;
        const skip = (page - 1) * PAGE_SIZE;
        const totalUsers = await UserRepository.count();
        const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
        const users = await UserRepository.findAllWithPagination(limit, skip);
        return {
            users,
            totalPages,
            currentPage: page,
            totalUsers
        };
    }

    async countUsers() {
        return await UserRepository.count();
    }

    async getUserById(id) {
        return await UserRepository.findById(id);
    }

    async updateUserProfile(id, userData) {
        if (!id || !userData) {
            throw new Error("Missing user ID or user data");
        }
        // Check if the user exists
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Check if the email already exists for another user
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser && existingUser._id?.toString() !== id) {
            throw new Error("Email đã tồn tại");
        }
        // Update the user
        return await UserRepository.update(id, userData);
    }

    async deleteUser(id) {
        if (!id) {
            throw new Error("Missing user ID");
        }
        // Check if the user exists
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        // Delete the user
        return await UserRepository.delete(id);
    }

    async countBySearch(query) {
        if (!query) {
            throw new Error("Missing search query");
        }
        // Count the number of users matching the search query
        return await UserRepository.countBySearch(query);
    }

    async searchUser(query, page = 1) {
        const skip = (page - 1) * PAGE_SIZE;
        if (!query) {
            throw new Error("Missing search query");
        }
        const totalUsers = await this.countBySearch(query);
        const totalPages = Math.ceil(totalUsers / 2); // Assuming 2 users per page
        // Search for users based on the query
        const users = await UserRepository.searchUser(query, PAGE_SIZE, skip);
        return {
            users,
            totalUsers,
            totalPages,
            currentPage: page
        };
    }
}

module.exports = new UserService();
