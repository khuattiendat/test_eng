const questionService = require('../services/questionService');
const {responsiveApiSuccess, responsiveApiError} = require("../utils/responsiveApi");
const {ObjectId} = require('mongodb');

class QuestionController {
    async create(req, res) {
        try {
            const data = req.body;
            if (!data) {
                return res.status(400).json({message: 'Missing data'});
            }
            const question = await questionService.create(data);
            return res.status(201).json(responsiveApiSuccess('Create question successfully', question));
        } catch (error) {
            return res.status(500).json(responsiveApiError(error.message || 'Error Server'));
        }
    }

    async getAllWithPagination(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const data = await questionService.getAllWithPagination(page);
            const {questions, totalPages, currentPage, totalQuestions} = data;

            return res.status(200).json(responsiveApiSuccess('Get all questions successfully', {
                questions,
                totalPages,
                currentPage,
                totalQuestions,
            }));
        } catch (error) {
            return res.status(500).json(responsiveApiError(error.message || 'Error Server'));
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            if (!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid or missing id'});
            }
            const question = await questionService.getById(id);
            return res.status(200).json(responsiveApiSuccess('Get question successfully', question));
        } catch (error) {
            return res.status(500).json(responsiveApiError(error.message || 'Error Server'));
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            if (!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid or missing id'});
            }
            const question = await questionService.update(id, data);
            return res.status(200).json(responsiveApiSuccess('Update question successfully', question));
        } catch (error) {
            return res.status(500).json(responsiveApiError(error.message || 'Error Server'));
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            if (!id || !ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid or missing id'});
            }
            await questionService.delete(id);
            return res.status(200).json(responsiveApiSuccess('Delete question successfully'));
        } catch (error) {
            return res.status(500).json(responsiveApiError(error.message || 'Error Server'));
        }
    }
}

module.exports = new QuestionController();