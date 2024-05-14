import mongoose from 'mongoose';

const { Schema } = mongoose;

const machineSchema = new Schema({
  machine_name: String,
  machine_description: String,
  price: Number,
  category: String,
  images: String,
  applicant_Id: String,
  mainImage:String
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

 export const Machine = mongoose.model('machine', machineSchema);


