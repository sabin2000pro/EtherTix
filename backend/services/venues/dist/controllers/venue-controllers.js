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
exports.uploadVenuePhoto = exports.fetchVenuesWithinRadius = exports.deleteAllVenues = exports.deleteVenueByID = exports.editVenueByID = exports.createVenue = exports.fetchVenueByID = exports.fetchAllVenues = void 0;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const fetchAllVenues = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @todo
    }
    catch (error) {
    }
});
exports.fetchAllVenues = fetchAllVenues;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const fetchVenueByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = request.params.venueId;
});
exports.fetchVenueByID = fetchVenueByID;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const createVenue = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.createVenue = createVenue;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const editVenueByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = request.params.venueId;
});
exports.editVenueByID = editVenueByID;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const deleteVenueByID = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const venueId = request.params.venueId;
});
exports.deleteVenueByID = deleteVenueByID;
// @desc      Fetch All Event Tickets
// @route     GET /api/v1/tickets
// @route     GET /api/v1/events/:eventId/tickets
// @access    Private (Authorization Token Required)
const deleteAllVenues = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteAllVenues = deleteAllVenues;
// @desc      Fetch All Event Venues Within Radius
// @route     GET /api/v1/events/:venueId/:postalcode/:radius
// @access    Private (Authorization Token Required)
const fetchVenuesWithinRadius = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.fetchVenuesWithinRadius = fetchVenuesWithinRadius;
// @desc      Upload Venue Photo
// @route     PUT /api/v1/venues/upload
// @access    Private (Authorization Token Required)
const uploadVenuePhoto = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.uploadVenuePhoto = uploadVenuePhoto;
