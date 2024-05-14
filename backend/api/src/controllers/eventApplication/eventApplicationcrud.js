
import { AppError,catchAsync } from "../../middlewares/globaleerorshandling.js";
import eventConst from "../../models/event.js";
import { eventApplicationconst } from "../../models/applicationEvent.js";
export const createEventApplication = catchAsync(async (req, res) => {
    const  eventId= req.params.eventId
    const {fullNames,email,phoneNUmber}=req.body
    // console.log(req.body)
    const event = await eventConst.findById(eventId);
    if (!event || event.eventStatus === "closed") {
        throw new AppError("Event is closed or not found ", 404);
    }
    // console.log(req.body)
    const eventApplication = await eventApplicationconst.create(req.body);
    const newAttendee = {
        fullName: fullNames,
        email:email,
        applicationformId:eventApplication._id,
        phoneNUmber: phoneNUmber
      };
    event.attendees.push(newAttendee)
    event.numberOflegisteredforEvent +=1;
    event.save();
    res.status(201).json({
        status: "success",
        message: "Event application created successfully",
        data: eventApplication,
        eventNOw:event
    });
});

export const getAllEventApplications = catchAsync(async (req, res) => {
    const eventApplications = await eventApplicationconst.find();

    res.status(200).json({
        status: "success",
        message: "All event applications retrieved successfully",
        data: eventApplications,
    });
});

export const getEventApplicationById = catchAsync(async (req, res) => {
    const eventApplication = await eventApplicationconst.findById(req.params.id);

    if (!eventApplication) {
        throw new AppError("Event application not found", 404);
    }

    res.status(200).json({
        status: "success",
        message: "Event application retrieved successfully",
        data: eventApplication,
    });
});

export const updateEventApplicationById = catchAsync(async (req, res) => {
    const eventApplication = await eventApplicationconst.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!eventApplication) {
        throw new AppError("Event application not found", 404);
    }

    res.status(200).json({
        status: "success",
        message: "Event application updated successfully",
        data: eventApplication,
    });
});


export const deleteEventApplicationById = catchAsync(async (req, res) => {
    const eventApplication = await eventApplicationconst.findByIdAndDelete(req.params.id);

    if (!eventApplication) {
        throw new AppError("Event application not found", 404);
    }

    res.status(204).json({
        status: "success",
        message: "Event application deleted successfully",
        data: null,
    });
});





