import mongoose from 'mongoose';
import { formattedDate } from '../../utils/datefunctin.js';
const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:false
        // optional, you can remove this field if email is not required
    },
    message: {
        type: String,
        required: true
    },
    mainImage: {
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    }
},
{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  });

 export const Testimonial = mongoose.model('Testimonial', testimonialSchema);

