const Joi = require("joi");

const ExamCreateRequest = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.base': 'Tiêu đề phải là một chuỗi',
        'string.empty': 'Tiêu đề không được để trống',
        'string.min': 'Tiêu đề phải có ít nhất {#limit} ký tự',
        'any.required': 'Tiêu đề là bắt buộc'
    }),
    level: Joi.string().valid('easy', 'medium', 'hard').required().messages({
        'string.base': 'Cấp độ phải là một chuỗi',
        'any.only': 'Cấp độ không hợp lệ',
        'any.required': 'Cấp độ là bắt buộc'
    }),
    duration: Joi.number().integer().positive().required().messages({
        'number.base': 'Thời gian làm bài phải là một số',
        'number.integer': 'Thời gian làm bài phải là một số nguyên dương',
        'number.positive': 'Thời gian làm bài phải lớn hơn 0',
        'any.required': 'Thời gian làm bài là bắt buộc'
    }),
});


module.exports = ExamCreateRequest;
