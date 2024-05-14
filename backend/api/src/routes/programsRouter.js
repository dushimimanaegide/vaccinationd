import {
  createProgram,
  updateProgram,
  closeProgram,
  openProgram,
  getAllPrograms,
  findProgramById,
  deleteProgramById,
  getProgramById
} from '../controllers/programscrud.js/index.js'
import { getCountPerMonthForPrograms } from '../controllers/charts/monthscharts.js'
import { getAllApplicantsByCategoryForAllPrograms } from '../controllers/charts/listinallcategoriesfor all program.js'
import { chartsforallprograms } from '../controllers/charts/chartsforAllprograms.js'
import { countApplicationsByCategory } from '../controllers/charts/chartsforsingleprogram.js'
import { listApplicantsByCategory } from '../controllers/charts/listsforsingleprogram.js'
import express from 'express'
import { uploaded } from '../../utils/multer.js'
import dotenv from 'dotenv'
dotenv.config()
import { verifyingtoken } from '../../utils/jwtfunctions.js'
import { isAdmin } from '../middlewares/isadmin.js'
const programRouter = express.Router()
programRouter.get('/getAllPrograms', getAllPrograms)
programRouter.get('/getProgramById/:id', getProgramById)
 programRouter.use(verifyingtoken)
programRouter.patch('/openProgram/:id', isAdmin, openProgram)
programRouter.post('/createProgram', uploaded, isAdmin, createProgram)
programRouter.patch('/updateProgram/:id', uploaded, isAdmin, updateProgram)
programRouter.patch('/closeProgram/:id', isAdmin, closeProgram)
programRouter.delete(
  '/deleteProgramById/:programID',
  isAdmin,
  deleteProgramById
)
programRouter.get('/getCountPerMonthForPrograms', getCountPerMonthForPrograms)
programRouter.get(
  '/countApplicationsByCategory/:programId',
  countApplicationsByCategory
)
programRouter.get('/chartsforallprograms', chartsforallprograms)
programRouter.get(
  '/getAllApplicantsByCategoryForAllPrograms',
  getAllApplicantsByCategoryForAllPrograms
)
programRouter.get("/listApplicantsByCategory/:programId",listApplicantsByCategory)
export default programRouter
