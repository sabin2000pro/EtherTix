"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenNotFoundError = exports.DuplicateFieldError = exports.AccountVerifiedError = exports.AccountNotActiveError = exports.UnauthenticatedError = exports.ImproperHTTPMethod = exports.ForbiddenError = exports.UnauthorizedError = exports.ServerError = exports.FileTooLargeError = exports.JwtTokenError = exports.NotFoundError = exports.BadRequestError = exports.errorHandler = exports.CustomError = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
    processErrors() {
        return { message: this.message, statusCode: this.statusCode, status: this.status };
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, request, response, next) => {
    if (err instanceof CustomError) {
        return response.status(404).json({ message: err.message, errors: err.processErrors() });
    }
    return next();
};
exports.errorHandler = errorHandler;
class BadRequestError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "Bad Request Error.";
        this.statusCode = statusCode;
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "Resource not found on the server";
        this.statusCode = statusCode;
    }
}
exports.NotFoundError = NotFoundError;
class JwtTokenError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "JWT Token Invalid. Please check the token again.";
        this.statusCode = statusCode;
    }
}
exports.JwtTokenError = JwtTokenError;
class FileTooLargeError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.status = "The file size of the file you uploaded is too large. Check again.";
        this.statusCode = statusCode;
    }
}
exports.FileTooLargeError = FileTooLargeError;
class ServerError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.status = "Unexpected Server Error Occurred";
        this.statusCode = statusCode;
    }
}
exports.ServerError = ServerError;
class UnauthorizedError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        this.statusCode = statusCode;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
        this.statusCode = statusCode;
    }
}
exports.ForbiddenError = ForbiddenError;
class ImproperHTTPMethod extends Error {
}
exports.ImproperHTTPMethod = ImproperHTTPMethod;
class UnauthenticatedError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        this.statusCode = statusCode;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class AccountNotActiveError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.statusCode = statusCode;
    }
}
exports.AccountNotActiveError = AccountNotActiveError;
class AccountVerifiedError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.statusCode = statusCode;
    }
}
exports.AccountVerifiedError = AccountVerifiedError;
class DuplicateFieldError extends Error {
}
exports.DuplicateFieldError = DuplicateFieldError;
class JwtTokenNotFoundError extends Error {
}
exports.JwtTokenNotFoundError = JwtTokenNotFoundError;
