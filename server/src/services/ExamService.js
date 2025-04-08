const examRepository = require('../repositories/ExamRepository');

class ExamService {
    async create(data) {
        if (!data) {
            throw new Error('Exam data is required');
        }
        return await examRepository.create(data);
    }

    async getAllWithPagination(page = 1) {
        const PAGE_SIZE = process.env.PAGE_SIZE || 10;
        const limit = PAGE_SIZE;
        const skip = (page - 1) * PAGE_SIZE;
        const totalExams = await examRepository.count();
        const totalPages = Math.ceil(totalExams / PAGE_SIZE);
        const exams = await examRepository.getAllWithPagination(limit, skip);
        return {
            exams,
            totalPages,
            currentPage: page,
            totalExams
        };
    }

    async getById(id) {
        const exam = await examRepository.findById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        return exam;
    }

    async update(id, data) {
        if (!id || !data) {
            throw new Error('Exam ID and data are required');
        }
        const exam = await this.getById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        return await examRepository.update(id, data);
    }

    async delete(id) {
        if (!id) {
            throw new Error('Exam ID is required');
        }
        const exam = await this.getById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        return await examRepository.delete(id);
    }
}

module.exports = new ExamService();