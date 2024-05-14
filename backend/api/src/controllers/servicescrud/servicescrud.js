import { servicesConst } from "../../models/servicesModel.js";
import { v2 as cloudinary } from 'cloudinary';
import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const createService = catchAsync(async (req, res) => {
    const newService = new servicesConst(req.body);

    if (req.files && req.files.mainImage) {
        newService.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const savedService = await newService.save();

    res.status(201).json({
        status: "success",
        message: "Service created successfully",
        data: savedService
    });
});

const getAllServices = catchAsync(async (req, res) => {
    const allServices = await servicesConst.find();
    res.status(200).json({
        status: "success",
        data: allServices
    });
});

const updateServiceById = catchAsync(async (req, res) => {
    const serviceId = req.params.id;
    const updatedService = req.body;

    if (req.files && req.files.mainImage) {
        updatedService.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const result = await servicesConst.findByIdAndUpdate(serviceId, updatedService, { new: true });

    if (!result) {
        return res.status(404).json({
            status: "error",
            message: "Service not found"
        });
    }

    res.status(200).json({
        status: "success",
        message: "Service updated successfully",
        data: result
    });
});

const deleteServiceById = catchAsync(async (req, res) => {
    const serviceId = req.params.id;
    const deletedService = await servicesConst.findByIdAndDelete(serviceId);

    if (!deletedService) {
        return res.status(404).json({
            status: "error",
            message: "Service not found"
        });
    }

    res.status(200).json({
        status: "success",
        message: "Service deleted successfully",
        data: deletedService
    });
});

export { createService, getAllServices, updateServiceById, deleteServiceById };
