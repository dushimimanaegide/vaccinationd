import express from "express";
import {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachineById,
  deleteMachineById,
  deleteAllMachines,
} from "../controllers/machinescontrollers/machinescrud.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
import { uploaded } from "../../utils/multer.js"
import { isAdmin } from "../middlewares/isadmin.js";
const machineRouter = express.Router();
machineRouter.get("/getAllMachines",getAllMachines);
machineRouter.get("/getMachineById/:id",getMachineById);
machineRouter.use(verifyingtoken)
machineRouter.post("/createMachine", uploaded, isAdmin,createMachine);
machineRouter.patch("/updateMachineById/:id", uploaded,isAdmin,updateMachineById);
machineRouter.delete("/deleteMachineById/:id", isAdmin,deleteMachineById);
machineRouter.delete("/deleteAllMachines", isAdmin,deleteAllMachines);

export default machineRouter;
