const User = require("../models/User");

class UserRepository {
    async findByEmail(email) {
        return User.findOne({email})
            .select("-refreshToken");
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findAllWithPagination(limit, skip) {
        return User.find()
            .select("-password -refreshToken")
            .limit(limit).skip(skip);
    }

    async count() {
        return User.countDocuments();
    }

    async countBySearch(query) {
        return User.countDocuments({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {email: {$regex: query, $options: "i"}},
                {phone: {$regex: query, $options: "i"}}
            ]
        });
    }

    async update(id, userData) {
        return User.findByIdAndUpdate(id, userData, {new: true})
            .select("-password -refreshToken");
    }

    async getByRefreshToken(refreshToken) {
        return User.findOne({refreshToken});
    }

    async findById(id) {
        return User.findById(id).select("-password -refreshToken");
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }

    async searchUser(query, limit, skip) {
        return User.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {email: {$regex: query, $options: "i"}},
                {phone: {$regex: query, $options: "i"}}
            ]
        })
            .select("-password -refreshToken")
            .limit(limit)
            .skip(skip);

    }
}

module.exports = new UserRepository();
