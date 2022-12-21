"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTicketsSoldLastThirtyDays = exports.fetchVipTickets = exports.fetchStandardTickets = exports.fetchPremiumTickets = exports.deleteTicketByID = exports.deleteAllTickets = exports.editTicketByID = exports.createNewTicket = exports.getEventTicketById = exports.fetchAllTickets = void 0;
const error_handler_1 = require("../middleware/error-handler");
const http_status_codes_1 = require("http-status-codes");
const ticket_model_1 = require("../models/ticket-model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// @desc      Fetch All Tickets
// @route     GET /api/v1/tickets
// @access    Private (Authorization Token Required)
exports.fetchAllTickets = (0, express_async_handler_1.default)((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield ticket_model_1.Ticket.find().populate("event");
        const totalTickets = yield ticket_model_1.Ticket.countDocuments({});
        const searchQuery = request.query.search;
        const regexInit = new RegExp(searchQuery, 'i');
        const foundTickets = tickets.map(ticketData => ticketData.name.match(regexInit));
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, tickets, data: searchQuery ? foundTickets : tickets, sentAt: new Date(Date.now()) });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
    finally {
        console.log(`Gracefully handled error`);
    }
}));
// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:ticketId
// @access    Private (Authorization Token Required)
const getEventTicketById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketId = request.params.ticketId;
        const ticket = yield ticket_model_1.Ticket.findById(ticketId).populate("event"); // Find the ticket and populate it with the event that it corresponds to
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, ticket, sentAt: new Date(Date.now()) });
    }
    catch (error) {
    }
    finally {
        return console.log(`Error Handled Gracefully`);
    }
});
exports.getEventTicketById = getEventTicketById;
// @desc      Create New Event Ticket
// @route     POST /api/v1/tickets/:eventId
// @access    Private (JWT Authorization Token Required)
const createNewTicket = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
    }
    catch (error) {
    }
});
exports.createNewTicket = createNewTicket;
// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)
const editTicketByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketId = request.params.ticketId;
});
exports.editTicketByID = editTicketByID;
// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)
const deleteAllTickets = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteAllTickets = deleteAllTickets;
const deleteTicketByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteTicketByID = deleteTicketByID;
const fetchPremiumTickets = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchPremiumTickets = fetchPremiumTickets;
const fetchStandardTickets = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchStandardTickets = fetchStandardTickets;
const fetchVipTickets = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchVipTickets = fetchVipTickets;
const fetchTicketsSoldLastThirtyDays = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchTicketsSoldLastThirtyDays = fetchTicketsSoldLastThirtyDays;
