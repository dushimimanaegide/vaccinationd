import {
  newApply,
  getAllApplicants,
  deleteApplication,
  approveApplication,
  onWaitingList,
  rejectApplication
} from '../controllers/aboutapplication/index.js'
import { uploaded } from '../../utils/multer.js'
import express from 'express'
import { isAdmin } from '../middlewares/isadmin.js'
import { verifyingtoken } from '../../utils/jwtfunctions.js'
import { getCountPerMonthForApplications } from '../controllers/charts/monthscharts.js'
const appRouter = express.Router()
appRouter.post('/applyFor/:id', uploaded, newApply)
appRouter.use(verifyingtoken)
appRouter.get(
  '/getAll/addedOnwaitingList/:addedOnwaitingList',
  getAllApplicants
)
appRouter.get('/getAll/admitted/:admitted', isAdmin, getAllApplicants)
appRouter.get('/getAll', isAdmin, getAllApplicants)
appRouter.get('/getApplicationById/:id', isAdmin, getAllApplicants)
appRouter.get('/getAll/noAdmitted/:noAdmitted', getAllApplicants)
appRouter.delete('/deteteById/:id', isAdmin, deleteApplication)
appRouter.patch('/approveApplicationById/:id', isAdmin, approveApplication)
appRouter.patch('/addOnWaitingListById/:id', isAdmin, onWaitingList)
appRouter.patch('/rejectById/:id', isAdmin, rejectApplication)
appRouter.get('/countPerMonth',isAdmin,getCountPerMonthForApplications)
export default appRouter
