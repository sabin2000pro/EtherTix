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
exports.uploadEventPhoto = exports.deleteAllEvents = exports.deleteEventByID = exports.updateEventByID = exports.createNewEvent = exports.fetchSingleEvent = exports.fetchAllEvents = void 0;
const fetchAllEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchAllEvents = fetchAllEvents;
const fetchSingleEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "Single Event Here" });
});
exports.fetchSingleEvent = fetchSingleEvent;
const createNewEvent = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "All Events Here" });
});
exports.createNewEvent = createNewEvent;
const updateEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "All Events Here" });
});
exports.updateEventByID = updateEventByID;
const deleteEventByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "All Events Here" });
});
exports.deleteEventByID = deleteEventByID;
const deleteAllEvents = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return response.status(200).json({ success: true, message: "All Events Here" });
});
exports.deleteAllEvents = deleteAllEvents;
const uploadEventPhoto = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = request.files.file;
    return response.status(200).json({ success: true, message: "Upload Event Photo Here" });
});
exports.uploadEventPhoto = uploadEventPhoto;
//# sourceMappingURL=event-controller.js.map