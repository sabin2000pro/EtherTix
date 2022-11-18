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
exports.fetchEventsWithinRadius = exports.fetchTrendingEvents = exports.uploadEventPhoto = exports.deleteEventByID = exports.deleteEvents = exports.editEventByID = exports.createNewEvent = exports.fetchSingleEvent = exports.fetchAllEvents = void 0;
const fetchAllEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchAllEvents = fetchAllEvents;
const fetchSingleEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchSingleEvent = fetchSingleEvent;
const createNewEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.createNewEvent = createNewEvent;
const editEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.editEventByID = editEventByID;
const deleteEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteEvents = deleteEvents;
const deleteEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteEventByID = deleteEventByID;
const uploadEventPhoto = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.uploadEventPhoto = uploadEventPhoto;
const fetchTrendingEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchTrendingEvents = fetchTrendingEvents;
const fetchEventsWithinRadius = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchEventsWithinRadius = fetchEventsWithinRadius;
