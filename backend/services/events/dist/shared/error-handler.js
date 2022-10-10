"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenNotFoundError = exports.DuplicateFieldError = exports.UnauthenticatedError = exports.ImproperHTTPMethod = exports.UnauthorizedError = exports.ServerError = exports.FileTooLargeError = exports.JwtTokenError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
var http_status_codes_1 = require("http-status-codes");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        return _super.call(this, message) || this;
    }
    CustomError.prototype.processErrors = function () {
        return { message: this.message, statusCode: this.statusCode, status: this.status };
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        _this.status = "Bad Request Error.";
        _this.statusCode = statusCode;
        return _this;
    }
    return BadRequestError;
}(Error));
exports.BadRequestError = BadRequestError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        _this.status = "Resource not found on the server";
        _this.statusCode = statusCode;
        return _this;
    }
    return NotFoundError;
}(Error));
exports.NotFoundError = NotFoundError;
var JwtTokenError = /** @class */ (function (_super) {
    __extends(JwtTokenError, _super);
    function JwtTokenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JwtTokenError;
}(Error));
exports.JwtTokenError = JwtTokenError;
var FileTooLargeError = /** @class */ (function (_super) {
    __extends(FileTooLargeError, _super);
    function FileTooLargeError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        _this.status = "The file size of the file you uploaded is too large. Check again.";
        _this.statusCode = statusCode;
        return _this;
    }
    return FileTooLargeError;
}(Error));
exports.FileTooLargeError = FileTooLargeError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        _this.status = "Unexpected Server Error Occurred";
        _this.statusCode = statusCode;
        return _this;
    }
    return ServerError;
}(Error));
exports.ServerError = ServerError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        _this.status = "You are unauthorized to perform this action.";
        return _this;
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
var ImproperHTTPMethod = /** @class */ (function (_super) {
    __extends(ImproperHTTPMethod, _super);
    function ImproperHTTPMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImproperHTTPMethod;
}(Error));
exports.ImproperHTTPMethod = ImproperHTTPMethod;
var UnauthenticatedError = /** @class */ (function (_super) {
    __extends(UnauthenticatedError, _super);
    function UnauthenticatedError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        _this.status = "You are unauthorized to perform this action.";
        _this.statusCode = statusCode;
        return _this;
    }
    return UnauthenticatedError;
}(Error));
exports.UnauthenticatedError = UnauthenticatedError;
var DuplicateFieldError = /** @class */ (function (_super) {
    __extends(DuplicateFieldError, _super);
    function DuplicateFieldError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DuplicateFieldError;
}(Error));
exports.DuplicateFieldError = DuplicateFieldError;
var JwtTokenNotFoundError = /** @class */ (function (_super) {
    __extends(JwtTokenNotFoundError, _super);
    function JwtTokenNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JwtTokenNotFoundError;
}(Error));
exports.JwtTokenNotFoundError = JwtTokenNotFoundError;
