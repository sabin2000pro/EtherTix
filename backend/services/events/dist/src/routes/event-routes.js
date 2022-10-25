"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event-controller");
const eventRouter = express_1.default.Router();
eventRouter.route("/events").get(event_controller_1.fetchAllEvents);
exports.default = eventRouter;
//# sourceMappingURL=event-routes.js.map