import { Machine } from "../../models/machines.js";
import dotenv from "dotenv";
dotenv.config();
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Create a machine
export const createMachine = catchAsync(async (req, res) => {
    const newMachine = req.body;

    // Upload main image to Cloudinary if present
    if (req.files && req.files.mainImage) {
        newMachine.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const createdMachine = await Machine.create(newMachine);
    res.status(201).json({
        status: "success",
        message: "Machine created successfully",
        data: createdMachine,
    });
});

// Get all machines
export const getAllMachines = catchAsync(async (req, res) => {
    const machines = await Machine.find();
    res.status(200).json({
        status: "success",
        message: "All machines retrieved successfully",
        data: machines,
    });
});

// Get machine by ID
export const getMachineById = catchAsync(async (req, res) => {
    const machine = await Machine.findById(req.params.id);
    if (!machine) {
        res.status(404).json({
            status: "error",
            message: "Machine not found",
        });
        return;
    }
    res.status(200).json({
        status: "success",
        message: "Machine retrieved successfully",
        data: machine,
    });
});

// Update machine by ID
export const updateMachineById = catchAsync(async (req, res) => {
    const updatedMachine = await Machine.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedMachine) {
        res.status(404).json({
            status: "error",
            message: "Machine not found",
        });
        return;
    }
    res.status(200).json({
        status: "success",
        message: "Machine updated successfully",
        data: updatedMachine,
    });
});

// Delete machine by ID
export const deleteMachineById = catchAsync(async (req, res) => {
    const deletedMachine = await Machine.findByIdAndDelete(req.params.id);
    if (!deletedMachine) {
        res.status(404).json({
            status: "error",
            message: "Machine not found",
        });
        return;
    }
    res.status(204).json({
        status: "success",
        message: "Machine deleted successfully",
        data: null,
    });
});

// Delete all machines
export const deleteAllMachines = catchAsync(async (req, res) => {
    await Machine.deleteMany();
    res.status(204).json({
        status: "success",
        message: "All machines deleted successfully",
        data: null,
    });
});
