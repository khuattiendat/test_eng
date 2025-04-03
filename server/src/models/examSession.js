const mongoose = require('mongoose');
const examSessionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['in_progress', 'completed'],
        default: 'in_progress',
    },
    score: {
        type: Number,
        default: 0,
    },
    submittedAt: {
        type: Date,
        default: null,
    },
}, {timestamps: true});
const ExamSession = mongoose.model('ExamSession', examSessionSchema);
module.exports = ExamSession;