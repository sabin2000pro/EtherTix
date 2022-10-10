"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailTransporter = () => {
    return nodemailer_1.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "29c023d298c4ba",
            pass: "7207ba67404426"
        }
    });
};
exports.emailTransporter = emailTransporter;
//# sourceMappingURL=email-sender.js.map