import mongoose from 'mongoose';

const { Schema } = mongoose;

const coreValuesSchema = new Schema({
  mainImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Assuming it's an array of image URLs
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const CoreValue = mongoose.model('ourCoreValues', coreValuesSchema);

export default CoreValue;
