import mongoose from 'mongoose';

const { Schema } = mongoose;

const partnersSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  mainImage: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required:false,
  },
  helpsIn: {
    type: String,
    required: false,
  },
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const Partner = mongoose.model('partners', partnersSchema);
//partners/getAllPartners
export default Partner;
