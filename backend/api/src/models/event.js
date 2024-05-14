

import { formattedDate } from '../../utils/datefunctin.js';
import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  mainImage: {
    type: String,
    required: false,
  },
  images: [{ type: String }],
  eventName: {
    type: String,
    required: false,
  },
  eventDescription: {
    type: String,
    required: false,
  },
  eventDate: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  attendees: {
    type: [{ type: Object }],
    default: [],
    required:false
  },
  numberOflegisteredforEvent:{
    type:Number,
    default: 0,
    required:false
  },
  to: {
    type: String,
    required: false,
  },
  from: {
    type: String,
    default: formattedDate,
    required: false,
  },
  eventStatus: {
    type: String,
    enum: ["closed", "open"],
    default:"closed"
  }
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const eventConst = mongoose.model('Event', eventSchema);

export default eventConst;

