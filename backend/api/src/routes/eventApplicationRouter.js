import express from 'express';  
import {
  createEventApplication,
  getEventApplicationById,
  getAllEventApplications,
  updateEventApplicationById,
  deleteEventApplicationById
} from '../controllers/eventApplication/eventApplicationcrud.js';
import { isAdmin } from '../middlewares/isadmin.js';
import { uploaded } from '../../utils/multer.js';
import { verifyingtoken } from '../../utils/jwtfunctions.js';
const eventApplicationRouter = express.Router();
eventApplicationRouter.use(verifyingtoken)
eventApplicationRouter.post('/createEventApplication/:eventId',isAdmin,uploaded, createEventApplication);
eventApplicationRouter.get('/getAllEventApplications',isAdmin, getAllEventApplications);
eventApplicationRouter.get('/getEventApplicationById/:id',isAdmin, getEventApplicationById);
eventApplicationRouter.patch('/updateEventApplicationById/:id',isAdmin,uploaded, updateEventApplicationById);
eventApplicationRouter.delete('/deleteEventApplicationById/:id',isAdmin, deleteEventApplicationById);

export default eventApplicationRouter;
