"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Working on the auth feature branch
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, "Username must be at least 5 characters long"],
        maxlength: [20, "Username must be at least 20 characters long"]
    },
    email: {
        type: String,
        required: true
    }
});
exports.default = UserSchema; //test
//# sourceMappingURL=user-model.js.map