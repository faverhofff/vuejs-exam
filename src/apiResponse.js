exports.success = (message, results, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        results
    };
};

exports.error = (message, statusCode) => {    
    return {
        message,
        code: statusCode,
        error: true
    };
};