import portfolioConst from "../../models/portfolio.js";
import dotenv from "dotenv";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Create a portfolio
export const createPortfolio = catchAsync(async (req, res) => {
    const newPortfolio = req.body;

    // Upload portfolio images to Cloudinary if present
    if (req.files && req.files.portfolioImages) {
        console.log("Portfolio Images processing ");
        let portfolioImagesArray = [];
        for (let index = 0; index < req.files.portfolioImages.length; index++) {
            portfolioImagesArray.push(
                (await cloudinary.uploader.upload(req.files.portfolioImages[index].path)).secure_url
            );
        }
        newPortfolio.portfolioImages = portfolioImagesArray;
    }

    const createdPortfolio = await portfolioConst.create(newPortfolio);
    res.status(201).json({
        status: "success",
        message: "Portfolio created successfully",
        data: createdPortfolio,
    });
});

// Get all portfolios
export const getAllPortfolios = catchAsync(async (req, res) => {
    const portfolios = await portfolioConst.find();
    res.status(200).json({
        status: "success",
        message: "All portfolios retrieved successfully",
        data: portfolios,
    });
});

// Get portfolio by ID
export const getPortfolioById = catchAsync(async (req, res) => {
    const portfolio = await portfolioConst.findById(req.params.id);
    if (!portfolio) {
        res.status(404).json({
            status: "error",
            message: "Portfolio not found",
        });
        return;
    }
    res.status(200).json({
        status: "success",
        message: "Portfolio retrieved successfully",
        data: portfolio,
    });
});

// Update portfolio by ID
export const updatePortfolioById = catchAsync(async (req, res) => {
    const updatedPortfolio = await portfolioConst.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedPortfolio) {
        res.status(404).json({
            status: "error",
            message: "Portfolio not found",
        });
        return;
    }

    // Upload new portfolio images to Cloudinary if present
    if (req.files && req.files.portfolioImages) {
        console.log("New Portfolio Images processing ");
        let newPortfolioImagesArray = [];
        for (let index = 0; index < req.files.portfolioImages.length; index++) {
            newPortfolioImagesArray.push(
                (await cloudinary.uploader.upload(req.files.portfolioImages[index].path)).secure_url
            );
        }
        updatedPortfolio.portfolioImages = newPortfolioImagesArray;
    }

    // Save the updated portfolio
    await updatedPortfolio.save();

    res.status(200).json({
        status: "success",
        message: "Portfolio updated successfully",
        data: updatedPortfolio,
    });
});

// Delete portfolio by ID
export const deletePortfolioById = catchAsync(async (req, res) => {
    const deletedPortfolio = await portfolioConst.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
        res.status(404).json({
            status: "error",
            message: "Portfolio not found",
        });
        return;
    }

    res.status(200).json({
        status: "success",
        message: "Portfolio deleted successfully",
        data: null,
    });
});
