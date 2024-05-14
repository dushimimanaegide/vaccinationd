import { deleteUserById,updateUserById,getAllUsers,addAdmin,signup,login,changepassword,removeAddimin,generateAndSendOTP,verifyOTPAndUpdatePassword} from "../authentication/index.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
import  express  from "express";
import { isAdmin } from "../middlewares/isadmin.js";
const authRouter=express.Router();
authRouter.post("/signup",signup);
authRouter.post("/login",login)
authRouter.use(verifyingtoken)
authRouter.post("/forget",generateAndSendOTP)
authRouter.post("/reset",verifyOTPAndUpdatePassword)
authRouter.post("/change",verifyingtoken,changepassword)
authRouter.get("/getAllusers",getAllUsers)
authRouter.patch("/addadminbyid",isAdmin,addAdmin)
authRouter.patch("/maketheadminasuser",isAdmin,removeAddimin)

export default authRouter;