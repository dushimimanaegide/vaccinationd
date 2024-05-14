import { getAllClasses, getClassById, createClass, updateClassById, deleteClassById } from "../controllers/aboutclasses/classescrud.js";
import { uploaded } from "../../utils/multer.js";
import express from "express";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
import { isAdmin } from "../middlewares/isadmin.js";
const classRouter = express.Router();

// Get all classes
classRouter.get("/getAllClasses", getAllClasses);
classRouter.get("/getClassById/:id", getClassById);
classRouter.use(verifyingtoken)
classRouter.post("/createClass", uploaded,isAdmin, createClass);
classRouter.patch("/updateClassById/:id", uploaded,isAdmin, updateClassById);
classRouter.delete("/deleteClassById/:id", isAdmin,deleteClassById);

export default classRouter;
