const Joi = require("joi");

const userLoginRequest = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email phải là một chuỗi',
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Email là bắt buộc'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Mật khẩu phải là một chuỗi',
        'string.empty': 'Mật khẩu không được để trống',
        'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự',
        'any.required': 'Mật khẩu là bắt buộc'
    }),
});


module.exports = userLoginRequest;
