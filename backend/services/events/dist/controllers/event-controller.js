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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEvent = exports.unfollowEvent = exports.followEvent = exports.dislikeEvent = exports.likeEvent = exports.fetchEventsWithinRadius = exports.fetchTrendingEvents = exports.uploadEventPhoto = exports.deleteEventByID = exports.deleteEvents = exports.editEventByID = exports.createNewEvent = exports.fetchSingleEvent = exports.getEventCount = exports.fetchAllEvents = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_handler_1 = require("../middlewares/error-handler");
const event_model_1 = require("../models/event-model");
const fetchAllEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield event_model_1.Event.find().populate({ path: 'ticket' });
    return response.status(200).json(events);
});
exports.fetchAllEvents = fetchAllEvents;
const getEventCount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getEventCount = getEventCount;
const fetchSingleEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = request.params.eventId;
        let event = yield event_model_1.Event.findById(eventId).populate('ticket'); // Fetch the event and populate it with the ticket data
        if (!eventId) {
            return next(new error_handler_1.NotFoundError("Event with that ID not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        if (!event) {
            return next(new error_handler_1.NotFoundError("Event with that ID not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
    }
    catch (error) {
    }
    finally {
    }
});
exports.fetchSingleEvent = fetchSingleEvent;
const createNewEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    finally {
    }
});
exports.createNewEvent = createNewEvent;
const editEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    finally {
    }
});
exports.editEventByID = editEventByID;
const deleteEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.deleteEvents = deleteEvents;
const deleteEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    finally {
    }
});
exports.deleteEventByID = deleteEventByID;
const uploadEventPhoto = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // API Code here to upload a photo for an event using multer or express file upload
    }
    catch (error) {
    }
    finally {
    }
});
exports.uploadEventPhoto = uploadEventPhoto;
const fetchTrendingEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    finally {
    }
});
exports.fetchTrendingEvents = fetchTrendingEvents;
const fetchEventsWithinRadius = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
    finally {
    }
});
exports.fetchEventsWithinRadius = fetchEventsWithinRadius;
const likeEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.likeEvent = likeEvent;
const dislikeEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.dislikeEvent = dislikeEvent;
const followEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.followEvent = followEvent;
const unfollowEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.unfollowEvent = unfollowEvent;
const searchEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let matchingEvents;
    const searchQuery = request.query.search;
    const searchRegex = new RegExp(searchQuery, 'i');
    const events = yield event_model_1.Event.find();
    matchingEvents = events.filter(event => event.name.match(searchRegex));
    return response.status(200).json(matchingEvents);
});
exports.searchEvent = searchEvent;
