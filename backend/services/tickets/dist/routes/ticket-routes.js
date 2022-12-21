"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket-controller");
exports.ticketRouter = express_1.default.Router({ mergeParams: true });
exports.ticketRouter.route('/').get(ticket_controller_1.fetchAllTickets);
