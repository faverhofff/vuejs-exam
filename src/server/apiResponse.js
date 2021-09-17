exports.apiResponse = (results, errors, statusCode) => {
    if(errors == null) errors = ''
    return {     
        errors: errors,
        status: statusCode,
        data: results        
    };
};