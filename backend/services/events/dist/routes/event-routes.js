"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event-controller");
exports.eventRouter = express_1.default.Router({ mergeParams: true });
exports.eventRouter.route('/').get(event_controller_1.fetchAllEvents).post(event_controller_1.createNewEvent).delete(event_controller_1.deleteEvents);
// eventRouter.route('/:id').get(fetchSingleEvent).put(editEventByID);
