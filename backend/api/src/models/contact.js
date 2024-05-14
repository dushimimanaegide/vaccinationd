import mongoose from"mongoose"
import { formattedDate } from "../../utils/datefunctin.js";

const contactSchema = new mongoose.Schema({
 name:{type:String},
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    dafault:"not yet replied",
    required: false,
  },
  replysubject:{
    type: String,
    dafault:"no subject reply",
    required: false,
  },
  sent_date: {
    type: String,
    default: formattedDate,
  },
  replydate: {
    type: Date,
    required:false
  },
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

 export const contactConst = mongoose.model('Contacts', contactSchema);


