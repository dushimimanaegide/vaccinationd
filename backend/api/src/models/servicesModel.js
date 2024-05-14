import mongoose from "mongoose";
const servicesSchema=new mongoose.Schema({
service_name:{
    type:String,
    required:false
},
mainImage:{
    type:String,
    required:false
}
,

},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
})
export const  servicesConst=mongoose.model('services',servicesSchema)