import { Testimonial } from "../../models/index.js";
//import { Testimonial } from '../../models/testimonial.js';
import { catchAsync,AppError } from "../../middlewares/globaleerorshandling.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Get all testimonials
export const getAllTestimonials = catchAsync(async (req, res) => {
    const testimonials = await Testimonial.find();
  
    if (testimonials.length === 0) {
      throw new AppError('No testimonials found', 404);
    }
  
  return  res.status(200).json({
      status: 'success',
      message: 'All testimonials retrieved successfully',
      data: testimonials,
    });
  });
  

// Get testimonial by ID
export const getTestimonialById = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

 return res.status(200).json({
    status: 'success',
    message: 'Testimonial retrieved successfully',
    data: testimonial,
  });
});

// Create testimonial
export const createTestimonial = catchAsync(async (req, res) => {
  let newTestimonial = { ...req.body };

  // Handle mainImage field
  if (req.files && req.files.mainImage) {
    newTestimonial.mainImage = (await cloudinary.uploader.upload(
      req.files.mainImage[0].path
    )).secure_url;
  }

  const testimonial = await Testimonial.create(newTestimonial);

 return res.status(201).json({
    status: 'success',
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

// Update testimonial by ID
export const updateTestimonialById = catchAsync(async (req, res) => {
  let updatedTestimonial = { ...req.body };

  // Handle mainImage field
  if (req.files && req.files.mainImage) {
    updatedTestimonial.mainImage = (await cloudinary.uploader.upload(
      req.files.mainImage[0].path
    )).secure_url;
  }

  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    updatedTestimonial
  );

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

   return res.status(200).json({
    status: 'success',
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

// Delete testimonial by ID
export const deleteTestimonialById = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }
  res.status(204).json({
    status: 'success',
    message: 'Testimonial deleted successfully',
    data: null,
  });
});
// Delete all testimonials
export const deleteAllTestimonials = catchAsync(async (req, res) => {
  await Testimonial.deleteMany();
  res.status(204).json({
    status: 'success',
    message: 'All testimonials deleted successfully',
    data: null,
  });
});
