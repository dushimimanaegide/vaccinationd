import mongoose from "mongoose";
import  {userconst}  from "../models/index.js";
import { passComparer,tokengenerating,passHashing } from "../../utils/index.js";
export const login= async (req,res) =>{
try{
  console.log(req.body.email);
let user = await userconst.findOne({email:req.body.email});
if(user){
    let istruepassword= await passComparer(req.body.password,user.password);
    if(istruepassword){
let token = tokengenerating({
  _id: user._id,
  email: user.email
});
res.status(200).json({
  message: "user logged in succeful",
  access_token: token,
  user: {
    email: user.email,
    location: user.location,
    fullname: user.fullNames,
    phone: user.phoneNumber,
    password: user.password,
    role:user.role
  }
});
 }
 else if (!istruepassword) {
        return res.status(401).json({ message: "Wrong password" });
      }
}
else if (!user) {
       return res.status(404).json({ mesage: "user not found" });
     }

}catch(err){
    console.log("its in login function------check the following error-------- ");
    console.log(err.message)
}
}

