import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  product_name: String,
  product_description: String,
  price: Number,
  category: String,
  images: String,
  applicant_Id: String,
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
