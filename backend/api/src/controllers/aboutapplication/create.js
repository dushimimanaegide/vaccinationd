import { applicationConst } from '../../models/index.js'
import { findProgramById } from '../programscrud.js/findByid.js'
import { htmlMessageOfapplication, sendEmail } from '../../../utils/index.js'
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})
export const newApply = async (req, res) => {
  console.log('Request Body:', req.body)
  let email = req.body.email
  let programId = req.params.id

  // let applicant = await applicationConst.findOne({ email })
  // if (applicant) {
  //   return res.status(409).json({
  //     message: `${req.body
  //       .email} already applied. Check your email for the confirmation.`
  //   })
  // }
  let program = await findProgramById(req, res, programId)
  if (program) {
    req.body.programName =program.programName
  }
  let newObject = { ...req.body }
 
  if (req.files && req.files.businessIdeaFile) {
    newObject.businessIdeaFile = (await cloudinary.uploader.upload(
      req.files.businessIdeaFile[0].path
    )).secure_url
  }
  if (req.files && req.files.innovationDescription) {
   
    newObject.innovationDescription = (await cloudinary.uploader.upload(
      req.files.innovationDescription[0].path
    )).secure_url
  }
  if (req.files && req.files.certificateOfRecentlyEducationLevel) {
    newObject.certificateOfRecentlyEducationLevel = (await cloudinary.uploader.upload(
      req.files.certificateOfRecentlyEducationLevel[0].path
    )).secure_url
  }
  newObject.programId=program._id;
  let newApplicant = await applicationConst.create(newObject)
 program.applicationsId.push(newApplicant._id)
program.totalApplicants += 1;
program.applicants.push(newApplicant);
program.applicationIds.push(newApplicant._id)
await program.save();
  await sendEmail(
    newApplicant.email,
    'Welcome to  fab lab  application',
    'application reconiginition!',
    htmlMessageOfapplication
  )
  return res.status(200).json({
    message: 'Your application has been received successfully',
    applicantInfo: newApplicant
  })
}
