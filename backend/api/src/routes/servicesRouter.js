import express from "express";
import { uploaded } from "../../utils/multer.js";
import {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} from "../controllers/servicescrud/servicescrud.js";
import { isAdmin } from "../middlewares/isadmin.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
const serviceRouter = express.Router();
serviceRouter.get('/getAllServices', getAllServices);
serviceRouter.use(verifyingtoken)
serviceRouter.post('/createService', uploaded,isAdmin, createService);

serviceRouter.patch('/updateServiceById/:id', uploaded,isAdmin, updateServiceById);
serviceRouter.delete('/deleteServiceById/:id',isAdmin, deleteServiceById);

export default serviceRouter;
