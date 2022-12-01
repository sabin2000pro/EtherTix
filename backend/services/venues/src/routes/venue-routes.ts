import express, {Router} from 'express';

export const venueRouter = express.Router({mergeParams: true}); // Create the venue router