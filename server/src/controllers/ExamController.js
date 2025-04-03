const {responsiveApiError, responsiveApiSuccess} = require("../utils/responsiveApi");
const examService = require("../services/ExamService");

class ExamController {
    async create(req, res) {
        try {
            const examData = req.body;
            const exam = await examService.create(examData);
            return res.status(201).json(responsiveApiSuccess('Thêm bài thi thành công', exam));
        } catch (error) {
            res.status(500).json(responsiveApiError(error?.message || 'Internal server error'));
        }
    }

    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const data = await examService.getAllWithPagination(page);
            const {exams, totalPages, currentPage, totalExams} = data;
            return res.status(200).json(responsiveApiSuccess('Lấy danh sách bài thi thành công', {
                exams,
                totalPages,
                currentPage,
                totalExams
            }));
        } catch (error) {
            res.status(500).json(responsiveApiError(error?.message || 'Internal server error'));
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            const exam = await examService.getById(id);
            return res.status(200).json(responsiveApiSuccess('Lấy thông tin bài thi thành công', exam));
        } catch (error) {
            res.status(500).json(responsiveApiError(error?.message || 'Internal server error'));
        }
    }
    async update(req, res) {
        try {
            const {id} = req.params;
            const examData = req.body;
            const exam = await examService.update(id, examData);
            return res.status(200).json(responsiveApiSuccess('Cập nhật bài thi thành công', exam));
        } catch (error) {
            res.status(500).json(responsiveApiError(error?.message || 'Internal server error'));
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            await examService.delete(id);
            return res.status(200).json(responsiveApiSuccess('Xóa bài thi thành công'));
        } catch (error) {
            res.status(500).json(responsiveApiError(error?.message || 'Internal server error'));
        }
    }
}

module.exports = new ExamController();