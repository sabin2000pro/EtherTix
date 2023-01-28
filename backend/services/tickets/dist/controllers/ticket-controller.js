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
        const tickets = yield ticket_model_1.Ticket.find();
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: tickets, sentAt: new Date(Date.now()) });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
}));
// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:id
// @access    Private (Authorization Token Required)
const getEventTicketById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const ticket = yield ticket_model_1.Ticket.findById(id);
        if (!ticket) {
            return next(new error_handler_1.NotFoundError("Ticket with that ID not found", 404));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, ticket, sentAt: new Date(Date.now()) });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.getEventTicketById = getEventTicketById;
// @desc      Create New Event Ticket
// @route     POST /api/v1/tickets/:id
// @access    Private (JWT Authorization Token Required)
const createNewTicket = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = request.body.event;
        if (!event) {
            return next(new error_handler_1.NotFoundError("Event with that ID not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        const ticketData = request.body;
        const ticket = new ticket_model_1.Ticket(ticketData, event);
        yield ticket.save();
        return response.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, ticket });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.createNewTicket = createNewTicket;
// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)
const editTicketByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        let ticket = yield ticket_model_1.Ticket.findById(id);
        if (!ticket) {
        }
    }
    catch (error) {
    }
});
exports.editTicketByID = editTicketByID;
// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)
const deleteAllTickets = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ticket_model_1.Ticket.deleteMany();
        return response.status(204).json({ success: true, data: {}, message: "Tickets Deleted" });
    }
    catch (error) {
    }
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
