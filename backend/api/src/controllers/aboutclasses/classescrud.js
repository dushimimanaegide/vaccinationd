import { classConst } from "../../models/classes.js";
import { catchAsync, AppError } from "../../middlewares/globaleerorshandling.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Create a class
export const createClass = catchAsync(async (req, res, next) => {
    const newClass = req.body;

    // Upload main image to Cloudinary if present
    if (req.files && req.files.mainImage) {
        newClass.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const createdClass = await classConst.create(newClass);
    if (!createdClass) {
        return next(new AppError("Class failed to add", 404));
    }

    res.status(201).json({
        status: "success",
        message: "Class created successfully",
        data: createdClass,
    });
});

// Get all classes
export const getAllClasses = catchAsync(async (req, res, next) => {
    const classes = await classConst.find();
    res.status(200).json({
        status: "success",
        message: "All classes retrieved successfully",
        data: classes,
    });
});

// Get class by ID
export const getClassById = catchAsync(async (req, res, next) => {
    const foundClass = await classConst.findById(req.params.id);
    if (!foundClass) {
        return next(new AppError("Class not found", 404));
    }

    res.status(200).json({
        status: "success",
        message: "Class retrieved successfully",
        data: foundClass,
    });
});

// Update class by ID
export const updateClassById = catchAsync(async (req, res, next) => {
    const updatedClass = await classConst.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Upload new main image to Cloudinary if present
    if (req.files && req.files.mainImage) {
        updatedClass.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    if (!updatedClass) {
        return next(new AppError("Class not found", 404));
    }

    // Save the updated class
    await updatedClass.save();

    res.status(200).json({
        status: "success",
        message: "Class updated successfully",
        data: updatedClass,
    });
});

// Delete class by ID
export const deleteClassById = catchAsync(async (req, res, next) => {
    const deletedClass = await classConst.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
        return next(new AppError("Class not found", 404));
    }

    res.status(204).json({
        status: "success",
        message: "Class deleted successfully",
        data: null,
    });
});
