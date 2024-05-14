
import { uploaded } from "../../utils/multer.js";
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonialById,
  deleteTestimonialById,
  deleteAllTestimonials
} from "../controllers/testmonyCrud/testmonycrud.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
import { isAdmin } from "../middlewares/isadmin.js";
import express from "express";

const testmonyRouter=express.Router();
testmonyRouter.get("/getAllTestimonials", getAllTestimonials);
testmonyRouter.use(verifyingtoken)
testmonyRouter.post('/createTestimonial', uploaded,isAdmin, createTestimonial);
testmonyRouter.get('/getTestimonialById/:id', isAdmin,getTestimonialById);
testmonyRouter.patch('/updateTestimonialById/:id', uploaded,isAdmin, updateTestimonialById);
testmonyRouter.delete('/deleteTestimonialById/:id',isAdmin, deleteTestimonialById);
testmonyRouter.delete('/deleteAllTestimonials',isAdmin, deleteAllTestimonials);
 export default testmonyRouter