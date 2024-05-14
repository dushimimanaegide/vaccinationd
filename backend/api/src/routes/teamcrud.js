import express from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMemberById,
    deleteTeamMemberById,
    deleteAllTeamMembers,
} from "../controllers/teamcontrolers/teamcrud.js";
import { uploaded } from "../../utils/multer.js";

const teamRouter=express.Router();
import { isAdmin } from "../middlewares/isadmin.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
teamRouter.get("/getAllTeamMembers",getAllTeamMembers);
teamRouter.get("/getTeamMemberById/:id", getTeamMemberById);
teamRouter.use(verifyingtoken)
teamRouter.post("/createTeamMember", uploaded,isAdmin, createTeamMember);

teamRouter.put("/:id", uploaded,isAdmin, updateTeamMemberById);

teamRouter.delete("/:id",isAdmin, deleteTeamMemberById);

teamRouter.delete("/",isAdmin, deleteAllTeamMembers);

export default teamRouter;
