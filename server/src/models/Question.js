const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true,
    },
    questionText: { // câu hỏi
        type: String,
        required: true,
    },
    questionType: { // loại câu hỏi
        type: String,
        enum: ['multiple_choice', 'fill_in_the_blank', 'essay'],
        required: true,
    },
    correctAnswerText: { // câu trả lời đúng (tự luận)
        type: [String],
    },
    options: {
        type: [
            {
                optionText: {
                    type: String,
                    required: true,
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                },
            }
        ],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one option is required',
        },
    }
}, {timestamps: true});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;