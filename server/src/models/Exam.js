const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    duration: { // thời gian làm bài (phút)
        type: Number,
        required: true,
    },
}, {timestamps: true});
const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;