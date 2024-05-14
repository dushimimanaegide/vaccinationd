// Import controllers
import {
    createPartner,
    getAllPartners,
    getPartnerById,
    updatePartnerById,
    deletePartnerById,
    deleteAllPartners,
  } from "../controllers/partenerscrud/partenerscrudsoperations.js";
  import express from "express"
  // Import middleware
  import { catchAsync } from "../middlewares/globaleerorshandling.js";
  import { uploaded } from "../../utils/multer.js";
  import { isAdmin } from "../middlewares/isadmin.js";
  import { verifyingtoken } from "../../utils/jwtfunctions.js";
  // Create express router
  const partenerRouter = express.Router();
  
  partenerRouter.get("/getAllPartners",getAllPartners);
  partenerRouter.get("/getPartnerById/:id",isAdmin,getPartnerById);
  
partenerRouter.use(verifyingtoken)
  partenerRouter.post("/createPartner", uploaded,isAdmin,createPartner);

  partenerRouter.patch("/updatePartnerById/:id", uploaded,isAdmin,updatePartnerById);
  
  partenerRouter.delete("/deletePartnerById/:id",isAdmin,deletePartnerById);
  
  partenerRouter.delete("/deleteAllPartners",isAdmin,deleteAllPartners);
  
  // Export the router
  export default partenerRouter;
  