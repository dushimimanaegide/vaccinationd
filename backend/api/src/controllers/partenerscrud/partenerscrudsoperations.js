import Partner from "../../models/parterners.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const createPartner = catchAsync(async (req, res) => {
    const newPartner = new Partner(req.body);

    if (req.files && req.files.mainImage) {
        newPartner.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const savedPartner = await newPartner.save();

    res.status(201).json({
        status: "success",
        message: "Partner created successfully",
        data: savedPartner,
    });
});

const getAllPartners = catchAsync(async (req, res) => {
    const partners = await Partner.find();
    res.status(200).json({
        status: "success",
        data: partners,
    });
});

const getPartnerById = catchAsync(async (req, res) => {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);

    if (!partner) {
        return res.status(404).json({
            status: "error",
            message: "Partner not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: partner,
    });
});

const updatePartnerById = catchAsync(async (req, res) => {
    const partnerId = req.params.id;
    const updatedPartner = req.body;

    if (req.files && req.files.mainImage) {
        updatedPartner.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const result = await Partner.findByIdAndUpdate(partnerId, updatedPartner, { new: true });

    if (!result) {
        return res.status(404).json({
            status: "error",
            message: "Partner not found",
        });
    }

    res.status(200).json({
        status: "success",
        message: "Partner updated successfully",
        data: result,
    });
});

const deletePartnerById = catchAsync(async (req, res) => {
    const partnerId = req.params.id;
    const deletedPartner = await Partner.findByIdAndDelete(partnerId);

    if (!deletedPartner) {
        return res.status(404).json({
            status: "error",
            message: "Partner not found",
        });
    }

    res.status(204).json({
        status: "success",
        message: "Partner deleted successfully",
        data: null,
    });
});

const deleteAllPartners = catchAsync(async (req, res) => {
    await Partner.deleteMany();
    res.status(204).json({
        status: "success",
        message: "All partners deleted successfully",
        data: null,
    });
});

export {
    createPartner,
    getAllPartners,
    getPartnerById,
    updatePartnerById,
    deletePartnerById,
    deleteAllPartners,
};
