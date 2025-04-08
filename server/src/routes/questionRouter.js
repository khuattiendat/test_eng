const express = require('express');
const router = express.Router();
const questionCreateRequest = require('../validators/QuestionCreateRequest');
const validate = require('../middlewares/validate');
const QuestionController = require('../controllers/QuestionController');
router.post('/create', validate(questionCreateRequest), QuestionController.create);
router.get('/get-all-pagination', QuestionController.getAllWithPagination);
router.get('/get-by-id/:id', QuestionController.getById);
router.put('/update/:id', QuestionController.update);
router.delete('/delete/:id', QuestionController.delete);

module.exports = router;