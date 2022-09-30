export class ErrorResponse extends Error {
    statusCode: any;
    
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}