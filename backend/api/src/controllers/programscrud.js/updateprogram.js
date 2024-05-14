import Program from "../../models/programs.js";
import { findProgramById } from "./findByid.js";
import { formattedDate } from "../../../utils/datefunctin.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


export const updateProgram= async (req,res)=>{
const programId = req.params.id;
const updatedData = req.body;

    if (req.files && req.files.mainImage) {
      updatedData.mainImage = (await cloudinary.uploader.upload(
          req.files.mainImage[0].path
      )).secure_url;
  }
  if (req.files && req.files.images) {
    console.log("Images processing ");
    let imagesArray = [];
    for (let index = 0; index < req.files.images.length; index++) {
      imagesArray.push(
        (await cloudinary.uploader.upload(req.files.images[index].path))
          .secure_url
      );
    }
    updatedData.images = imagesArray;
    console.log("imagesArray", imagesArray);
  }
    

 
    const updatedProgram = await Program.findByIdAndUpdate(
      programId,
      updatedData,
      { new: true }  
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }
    return res.status(200).json({ message: 'Program updated successfully', data: updatedProgram });
}


export const  closeProgram=async (req,res)=>{
  let id=req.params.id
let programToClose=await Program.findById(id);
 programToClose.endDate= formattedDate;
if (!programToClose) {
  return res.status(404).json({ message: "Program not found" });
}
programToClose.status="closed"
await programToClose.save();
return res.status(200).json({ message:"the program closed sussceful",
program_info:programToClose})

}

export const  openProgram=async (req,res)=>{
  let id=req.params.id
let programToOpen=await Program.findById(id);
if (!programToOpen) {
  return res.status(404).json({ message: "Program not found" });
}
programToOpen.startDate= formattedDate;
programToOpen.status="open"
await programToOpen.save();
return res.status(200).json({ message:"the program opened sussceful",
  program_info:programToOpen})

}


