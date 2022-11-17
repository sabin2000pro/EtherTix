import express, { Router } from "express";

export const eventRouter: Router = express.Router({mergeParams: true});