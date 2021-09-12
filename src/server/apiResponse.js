exports.apiResponse = (results, errors, statusCode) => {
    return {     
        errors: errors,
        status: statusCode,
        data: results        
    };
};