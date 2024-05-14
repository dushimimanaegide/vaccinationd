
import mongoose from 'mongoose';
import { formattedDate } from '../../utils/datefunctin.js';
const classSchema = new mongoose.Schema({
    classTitle: {
        type: String,
        required: false
    },
    heading:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    mainImage:{
        type:String,
        required:false
    },
},
{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  })
export const classConst = mongoose.model('classes', classSchema);
