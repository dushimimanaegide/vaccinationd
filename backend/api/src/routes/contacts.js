import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
  deleteAllContacts,
  replyToContactById,
} from "../controllers/contacts/contactcrud.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
import { isAdmin } from "../middlewares/isadmin.js";
const contactRouter = express.Router();

contactRouter.post("/createContact", createContact);
contactRouter.use(verifyingtoken);

contactRouter.get("/getAllContacts", isAdmin,getAllContacts);
contactRouter.get("/getContactById/:id",isAdmin, getContactById);

contactRouter.patch("/updateContactById/:id",isAdmin, updateContactById);
contactRouter.delete("/deleteContactById/:id",isAdmin, deleteContactById);
contactRouter.delete("/deleteAllContacts", isAdmin,deleteAllContacts);
contactRouter.patch("/replyToContactById/:id",isAdmin, replyToContactById);
export default contactRouter;
