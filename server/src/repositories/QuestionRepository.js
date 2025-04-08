const Question = require('../models/Question');

class QuestionRepository {
    async create(data) {
        const question = new Question(data);
        return await question.save();
    }

    async findById(id) {
        return Question.findById(id).populate('examId');
    }

    async findByExamId(examId) {
        return Question.find({examId}).populate('examId');
    }

    async findAll() {
        return Question.find().populate('examId');
    }

    async getAllWithPagination(limit, skip) {
        return Question.find().limit(limit).skip(skip);
    }

    async count() {
        return Question.countDocuments();
    }

    async update(id, data) {
        return Question.findByIdAndUpdate(id, data, {new: true});
    }

    async delete(id) {
        return Question.findByIdAndDelete(id);
    }
}

module.exports = new QuestionRepository();