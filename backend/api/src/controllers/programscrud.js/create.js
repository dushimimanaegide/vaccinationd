import Program  from"../../models/programs.js"
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const createProgram=async (req,res,next)=>
{
   const existingProgram = await Program.findOne({
  programName: req.body.programName,
});

// if (existingProgram) {
//   return res.status(400).json({
//       message: "A program with the same name already exists",
//   });
// }
  let newObject = { ...req.body };
if (req.files && req.files.mainImage) {
  console.log("----------------mainImage----- tackulating");
  newObject.mainImage = (await cloudinary.uploader.upload(
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
  newObject.images = imagesArray;
  console.log("imagesArray", imagesArray);
}

    let data=await Program.create(newObject)
    if (!data) {
        return res.status(404).json({ message: `Event failed to add` });
      }
      return res.status(200).json({
        message: `program  created successfully`,
        data: data,
      });
      next();
}