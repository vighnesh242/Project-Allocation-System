function createResponse(error,result){
    const response = {
        status: 'success',
        data: result
    };

    if(error != null){
        response.status = 'error';
        response.data = error;
    }

    return response;
}

var grno_Emp="";

module.exports = {
    createResponse: createResponse,
    grno_Emp:grno_Emp
};