import {
  applicationConst,
  Testimonial,
  Project,
  Course,
  userconst,
  contactConst
} from '../../models/index.js'
import Program from '../../models/programs.js'
import {
  htmlMessageApproved,htmlMessageOfapplication,
  htmlMessageRejected,
  htmlMessageWaitingList
} from '../../../utils/index.js'

import { sendEmail } from '../../../utils/index.js'

export const approveApplication = async (req, res) => {
  let id = req.params.id
  
  let applicant = await applicationConst.findById(id)
let programdata = await Program.findById(applicant.programId)
  if (!applicant) {
    return res.status(404).json({
      message: `No applicant with the id ${id} found.`
    })
  }
  applicant.isAllowed = 'admitted'
   req.body.message= "We are pleased to inform you that your application has been approved. Welcome to the program! Please find the details of your admission below:";
   programdata.totalAccepted += 1;
   await programdata.save();
   let name=applicant.fullNames;
let gender=applicant.gender
let company="fablab rwanda"
  applicant.isAllowed = 'admitted'
  await applicant.save()
  await sendEmail(
    applicant.email,
    'Congratulations! Your application has been approved.',
  'approval message',
  htmlMessageApproved(req.body.message, gender, name,company)
  )
  return res.status(200).json({
    message: 'The applicant was approved successfully.',
    information_of_applicant: applicant
  })
}

export const rejectApplication = async (req, res) => {
  let id = req.params.id
  let applicant = await applicationConst.findById(id)
  let programdata = await Program.findById(applicant.programId)
  if (!applicant) {
    return res.status(404).json({
      message: `No applicant with the id ${id} found.`
    })
  }
  let name=applicant.fullNames;
 let gender=applicant.gender
 let company="fablab rwanda"
  applicant.isAllowed = 'noAdmitted'
  await applicant.save()
  programdata.totalDenied += 1;
    await programdata.save();
  await sendEmail(
    applicant.email,
    'Application Rejected',
    'We regret to inform you that your application has been rejected.',
    htmlMessageRejected(req.body.message, gender, name)
  )
  
  return res.status(200).json({
    message: 'The applicant was rejected successfully.',
    information_of_applicant: applicant
  })
}

export const onWaitingList = async (req, res) => {
  let id = req.params.id
  let applicant = await applicationConst.findById(id)
  let name=applicant.fullNames;
  let gender=applicant.gender
  let company="fablab rwanda"
  if (!applicant) {
    return res.status(404).json({
      message: `No applicant with the id ${id} found.`
    })
  }
  applicant.isAllowed = 'addedOnWaitingList'
  await applicant.save()
  await sendEmail(
    applicant.email,
    'Application on Waiting List',
    'Your application has been added to the waiting list.',
    htmlMessageWaitingList(req.body.message, gender, name)
  )
  
  return res.status(200).json({
    message: 'The applicant was added to the waiting list successfully.',
    information_of_applicant: applicant
  })
}

// enum: ['admitted', 'noAdmitted','addedOnWaitingList'],
