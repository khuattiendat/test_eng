const Exam = require('../models/Exam');

class ExamRepository {
    async create(data) {
        const exam = await Exam.create(data);
        return exam.save();
    }

    async count() {
        return Exam.countDocuments();
    }

    async getAllWithPagination(limit, skip) {
        return Exam.find()
            .limit(limit)
            .skip(skip);
    }

    async findById(id) {
        return Exam.findById(id);
    }

    async update(id, data) {
        return Exam.findOneAndUpdate({_id: id}, data, {new: true});
    }
    async delete(id) {
        return Exam.findByIdAndDelete(id);
    }

}

module.exports = new ExamRepository();