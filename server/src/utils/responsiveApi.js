const responsiveApiSuccess = (message, data) => {
    return {
        status: 'success',
        message: message,
        data: data || null,
    };
}
const responsiveApiError = (message, data) => {
    return {
        status: 'error',
        message: message,
        data: data || null,
    };
}


module.exports = {
    responsiveApiSuccess,
    responsiveApiError
}