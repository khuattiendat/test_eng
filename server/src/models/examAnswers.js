const mongoose = require('mongoose');
const examAnswerSchema = new mongoose.Schema({
    examSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExamSession',
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    answerText: { // câu trả lời (tự luận)
        type: [String],
        required: true,
    },
    isCorrect: {
        type: Boolean,
        default: false,
    },
    submittedAt: {
        type: Date,
        default: null,
    },
}, {timestamps: true});
const ExamAnswer = mongoose.model('ExamAnswer', examAnswerSchema);
module.exports = ExamAnswer;