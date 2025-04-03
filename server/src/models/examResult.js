const mongoose = require('mongoose');
const examResultSchema = new mongoose.Schema({
    examSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExamSession',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    totalQuestions: { // tổng số câu hỏi
        type: Number,
        required: true,
    },
    correctAnswers: { // số cấu đúng
        type: Number,
        required: true,
    },
    wrongAnswers: { // số câu sai
        type: Number,
        required: true,
    },
    unanswered: { // số câu chưa trả lời
        type: Number,
        required: true,
    },
    completedAt: { // thời gian hoàn thành bài thi
        type: Date,
        default: null,
    },
}, {timestamps: true});
const ExamResult = mongoose.model('ExamResult', examResultSchema);
module.exports = ExamResult;
