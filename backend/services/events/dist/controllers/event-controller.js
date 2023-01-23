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
exports.unfollowEvent = exports.followEvent = exports.dislikeEvent = exports.likeEvent = exports.fetchEventsWithinRadius = exports.fetchTrendingEvents = exports.uploadEventPhoto = exports.deleteEventByID = exports.deleteEvents = exports.editEventByID = exports.createNewEvent = exports.fetchSingleEvent = exports.getEventCount = exports.fetchAllEvents = void 0;
const http_status_codes_1 = require("http-status-codes");
const error_handler_1 = require("../middlewares/error-handler");
const event_model_1 = require("../models/event-model");
const fetchAllEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.Event.find();
        return response.status(http_status_codes_1.StatusCodes.OK).json(events);
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.fetchAllEvents = fetchAllEvents;
const getEventCount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_model_1.Event.countDocuments({});
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, count: events });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.getEventCount = getEventCount;
const fetchSingleEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = request.params.eventId;
        let event = yield event_model_1.Event.findById(eventId);
        if (!eventId) {
            return next(new error_handler_1.NotFoundError("Event with that ID not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        if (!event) {
            return next(new error_handler_1.NotFoundError("Event with that ID not found", http_status_codes_1.StatusCodes.NOT_FOUND));
        }
        return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: event });
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.fetchSingleEvent = fetchSingleEvent;
const createNewEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventData = request.body;
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.createNewEvent = createNewEvent;
const editEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        let event = yield event_model_1.Event.findById(id);
        if (!event) {
        }
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
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
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.deleteEventByID = deleteEventByID;
const uploadEventPhoto = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // API Code here to upload a photo for an event using multer or express file upload
    }
    catch (error) {
    }
});
exports.uploadEventPhoto = uploadEventPhoto;
const fetchTrendingEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        if (error) {
            return next(new error_handler_1.BadRequestError(error.message, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
    }
});
exports.fetchTrendingEvents = fetchTrendingEvents;
const fetchEventsWithinRadius = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.fetchEventsWithinRadius = fetchEventsWithinRadius;
const likeEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let eventId = request.params.eventId;
    const event = yield event_model_1.Event.findById(eventId);
    let eventLikes = event.likes;
    if (!event) {
        return response.status(404).json({ msg: 'Event not found with that ID' });
    }
    // Increment the number of likes for the event
    eventLikes += 1;
    yield event.save();
    return response.status(http_status_codes_1.StatusCodes.OK).json({ success: true, likes: eventLikes });
});
exports.likeEvent = likeEvent;
const dislikeEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let eventId = request.params.eventId;
        const event = yield event_model_1.Event.findById(eventId);
        let currentLikes = event.likes;
        if (currentLikes < event.likes) {
        }
        if (!event) {
            return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Event not found with that ID' });
        }
    }
    catch (error) {
    }
});
exports.dislikeEvent = dislikeEvent;
const followEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.followEvent = followEvent;
const unfollowEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.unfollowEvent = unfollowEvent;
