class ErrorResponse extends Error {
    statusCode: number

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
    
}

export {ErrorResponse}