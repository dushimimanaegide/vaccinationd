import TeamMember from "../../models/team_members.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const createTeamMember = catchAsync(async (req, res) => {
    const newTeamMember = new TeamMember(req.body);

    if (req.files && req.files.mainImage) {
        newTeamMember.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const savedTeamMember = await newTeamMember.save();

    res.status(201).json({
        status: "success",
        message: "Team member created successfully",
        data: savedTeamMember,
    });
});

const getAllTeamMembers = catchAsync(async (req, res) => {
    const teamMembers = await TeamMember.find();
    res.status(200).json({
        status: "success",
        data: teamMembers,
    });
});

const getTeamMemberById = catchAsync(async (req, res) => {
    const teamMemberId = req.params.id;
    const teamMember = await TeamMember.findById(teamMemberId);

    if (!teamMember) {
        return res.status(404).json({
            status: "error",
            message: "Team member not found",
        });
    }

    res.status(200).json({
        status: "success",
        data: teamMember,
    });
});

const updateTeamMemberById = catchAsync(async (req, res) => {
    const teamMemberId = req.params.id;
    const updatedTeamMember = req.body;

    if (req.files && req.files.mainImage) {
        updatedTeamMember.mainImage = (await cloudinary.uploader.upload(
            req.files.mainImage[0].path
        )).secure_url;
    }

    const result = await TeamMember.findByIdAndUpdate(teamMemberId, updatedTeamMember, { new: true });

    if (!result) {
        return res.status(404).json({
            status: "error",
            message: "Team member not found",
        });
    }

    res.status(200).json({
        status: "success",
        message: "Team member updated successfully",
        data: result,
    });
});

const deleteTeamMemberById = catchAsync(async (req, res) => {
    const teamMemberId = req.params.id;
    const deletedTeamMember = await TeamMember.findByIdAndDelete(teamMemberId);

    if (!deletedTeamMember) {
        return res.status(404).json({
            status: "error",
            message: "Team member not found",
        });
    }

    res.status(204).json({
        status: "success",
        message: "Team member deleted successfully",
        data: null,
    });
});

const deleteAllTeamMembers = catchAsync(async (req, res) => {
    await TeamMember.deleteMany();
    res.status(204).json({
        status: "success",
        message: "All team members deleted successfully",
        data: null,
    });
});

export {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMemberById,
    deleteTeamMemberById,
    deleteAllTeamMembers,
};
