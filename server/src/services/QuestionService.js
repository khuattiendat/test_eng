const questionRepository = require('../repositories/QuestionRepository');
const examRepository = require('../repositories/ExamRepository');
const dotenv = require('dotenv');
dotenv.config();
const PAGE_SIZE = process.env.PAGE_SIZE || 10;

class QuestionService {
    async create(data) {
        const {examId} = data;
        const exitExam = await examRepository.findById(examId);
        if (!exitExam) {
            throw new Error('Exam not found');
        }
        return await questionRepository.create(data);
    }

    async getAllWithPagination(page) {
        const limit = PAGE_SIZE;
        const skip = (page - 1) * limit;
        const totalQuestions = await questionRepository.count();
        const questions = await questionRepository.getAllWithPagination(limit, skip);
        const totalPages = Math.ceil(totalQuestions / limit);
        return {
            questions,
            totalPages,
            currentPage: page,
            totalQuestions,
        }
    }

    async getById(id) {
        const question = await questionRepository.findById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    }

    async update(id, data) {
        if (!data) {
            throw new Error('Missing data');
        }
        const question = await questionRepository.findById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        const {examId} = data;
        const exitExam = await examRepository.findById(examId);
        if (!exitExam) {
            throw new Error('Exam not found');
        }
        return await questionRepository.update(id, data);
    }

    async delete(id) {
        const question = await questionRepository.findById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        return await questionRepository.delete(id);
    }
}

module.exports = new QuestionService();