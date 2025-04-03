const Joi = require("joi");

const userUpdateRequest = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.base': 'Tên phải là một chuỗi',
        'string.empty': 'Tên không được để trống',
        'string.min': 'Tên phải có ít nhất {#limit} ký tự',
        'any.required': 'Tên là bắt buộc'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email phải là một chuỗi',
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Email là bắt buộc'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required().messages({
        'string.base': 'Số điện thoại phải là một chuỗi',
        'string.empty': 'Số điện thoại không được để trống',
        'string.pattern.base': 'Số điện thoại không hợp lệ',
        'any.required': 'Số điện thoại là bắt buộc'
    }),
});


module.exports = userUpdateRequest;
