import express from "express";
import { uploaded } from "../../utils/multer.js";
import {
    createPortfolio,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolioById,
    deletePortfolioById,
} from "../controllers/aboutportfolio/portfoliocontrollers.js";
import { isAdmin } from "../middlewares/isadmin.js";
import { verifyingtoken } from "../../utils/jwtfunctions.js";
const portfolioRouter = express.Router();
portfolioRouter.get("/getAll",getAllPortfolios);
portfolioRouter.get("/get/:id", getPortfolioById);

portfolioRouter.use(verifyingtoken)
portfolioRouter.post("/create", uploaded,isAdmin,createPortfolio);
portfolioRouter.patch("/update/:id", uploaded, isAdmin,updatePortfolioById);

portfolioRouter.delete("/delete/:id",isAdmin, deletePortfolioById);

export default portfolioRouter;
