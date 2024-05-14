// routes/eventRouter.js

import express from 'express';
import { uploaded } from "../../utils/multer.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  deleteManyEventsByDate,
  closeEventById,
  openEventById,
} from "../controllers/aboutEvent/index.js";
import { isAdmin } from '../middlewares/isadmin.js';
import { verifyingtoken } from '../../utils/jwtfunctions.js';
const eventRouter = express.Router();
eventRouter.get('/getAllEvents', getAllEvents);
eventRouter.get('/getEventById/:eventId',getEventById);


eventRouter.use(verifyingtoken);
eventRouter.post('/createEvent', uploaded, isAdmin,createEvent);
eventRouter.get('/getEventById/:eventId',getEventById);
eventRouter.patch('/updateEventById/:eventId',uploaded, isAdmin,updateEventById);
eventRouter.delete('/deleteEventById/:eventId',isAdmin ,deleteEventById);
eventRouter.delete('/deleteManyEventsByDate/:startDate',isAdmin ,deleteManyEventsByDate);
eventRouter.patch('/closeEventById/:eventId',isAdmin ,closeEventById);
eventRouter.patch('/openEventById/:eventId',isAdmin, openEventById);

export default eventRouter;
