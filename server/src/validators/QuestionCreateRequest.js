const joi = require('joi');
const Joi = require("joi");

const questionCreateRequest = Joi.object({
    examId: Joi.string().required().messages({
        'string.base': 'id đề thi phải là một chuỗi',
        'string.empty': 'id đề thi không được để trống',
        'any.required': 'id đề thi là bắt buộc'
    }),
    questionText: Joi.string().required().messages({
        'string.base': 'Câu hỏi phải là một chuỗi',
        'string.empty': 'Câu hỏi không được để trống',
        'any.required': 'Câu hỏi là bắt buộc'
    }),
    questionType: Joi.string().valid('multiple_choice', 'fill_in_the_blank', 'essay').required().messages({
        'string.base': 'Loại câu hỏi phải là một chuỗi',
        'any.only': 'Loại câu hỏi không hợp lệ',
        'any.required': 'Loại câu hỏi là bắt buộc'
    }),
    correctAnswerText: Joi.array().items(Joi.string()).messages({
        'array.base': 'Câu trả lời đúng phải là một mảng',
        'string.base': 'Câu trả lời đúng phải là một chuỗi'
    }),
    options: Joi.array().items(
        Joi.object({
            optionText: Joi.string().required().messages({
                'string.base': 'Nội dung câu trả lời phải là một chuỗi',
                'string.empty': 'Nội dung câu trả lời không được để trống',
                'any.required': 'Nội dung câu trả lời là bắt buộc'
            }),
            isCorrect: Joi.boolean().required().messages({
                'boolean.base': 'Đáp án phải là một boolean',
                'any.required': 'Đáp án là bắt buộc'
            })
        })
    ).min(2).messages({
        'array.base': 'Các tùy chọn phải là một mảng',
        'object.base': 'Mỗi tùy chọn phải là một đối tượng',
        'array.min': 'Phải có ít nhất {#limit} tùy chọn',
    }),
});
module.exports = questionCreateRequest;