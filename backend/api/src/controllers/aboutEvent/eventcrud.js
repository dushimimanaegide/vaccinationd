import eventConst from "../../models/event.js";
import { catchAsync } from "../../middlewares/globaleerorshandling.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const createEvent = catchAsync(async (req, res, next) => {
    let newObject = { ...req.body };
    console.log("Below there should be the requested file");
    if (req.files && req.files.mainImage) {
      console.log("----------------mainImage----- tackulating");
      newObject.mainImage = (await cloudinary.uploader.upload(
        req.files.mainImage[0].path
      )).secure_url;
    }
    if (req.files && req.files.images) {
      console.log("Images processing ");
      let imagesArray = [];
      for (let index = 0; index < req.files.images.length; index++) {
        imagesArray.push(
          (await cloudinary.uploader.upload(req.files.images[index].path))
            .secure_url
        );
      }
      newObject.images = imagesArray;
      console.log("imagesArray", imagesArray);
    }
    let data = await eventConst.create(newObject);
    if (!data) {
      return next(new AppError(`Event failed to add`, 404));
    }
    return res.status(200).json({
      message: `Event created successfully`,
      data: data,
    });
});

export const getAllEvents = catchAsync(async (req, res, next) => {
  const events = await eventConst.find();
  res.status(200).json({
    message: 'List of events',
    data: events,
  });
});

export const getEventById = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const event = await eventConst.findById(eventId);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }
  res.status(200).json({
    message: 'Event retrieved successfully',
    data: event,
  });
});

export const updateEventById = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const updatedEvent = await eventConst.findByIdAndUpdate(eventId, req.body, { new: true });
  console.log(req.body)
  
  if (!updatedEvent) {
    return next(new AppError('Event not found', 404));
  }
  res.status(200).json({
    message: 'Event updated successfully',
    data: updatedEvent,
    req:req.body
  });
});

export const deleteEventById = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;
  const deletedEvent = await eventConst.findByIdAndRemove(eventId);
  if (!deletedEvent) {
    return next(new AppError('Event not found', 404));
  }
  res.status(200).json({ message: 'Event deleted successfully' });
});

export const closeEventById = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;

  // Find the event
  const existingEvent = await eventConst.findById(eventId);
  if (!existingEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  // Update the event status to "closed"
  existingEvent.eventStatus = "closed";
  const updatedEvent = await existingEvent.save();

  res.status(200).json({
    message: 'Event closed successfully',
    data: updatedEvent,
  });
});

// Handle unhandled routes
export const handleUndefinedRoutes = (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

// Global error handler
export const handleGlobalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
export const deleteManyEventsByDate = catchAsync(async (req, res, next) => {
  const startDate = req.params.startDate;
  const deletedEvents = await eventConst.deleteMany({ eventDate: { $gte: startDate } });
  if (!deletedEvents) {
    return res.status(404).json({ message: 'No events found to delete' });
  }
  res.status(200).json({ message: 'Events deleted successfully', data: deletedEvents });
});

export const openEventById = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;
  // Find the event
  const existingEvent = await eventConst.findById(eventId);
  if (!existingEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  // Update the event status to "open"
  existingEvent.eventStatus = "open";
  const updatedEvent = await existingEvent.save();
  res.status(200).json({
    message: 'Event opened successfully',
    data: updatedEvent,
  });
});