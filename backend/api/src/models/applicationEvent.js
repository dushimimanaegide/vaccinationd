import mongoose from "mongoose";
import { Schema } from "mongoose";
const eventAppSchema=new mongoose.Schema(
    {
fullNames:{
    type:String,
    required:true,
    default:"the event attendee full names"
},
email:{
    type:String,
    required:true,
},
phoneNUmber:{
    type:Number,
    required:true
},
address:{
    type:String,
    required:true,
    
},
country:{
    type:String,
    required:true,
    default:"the event attendee country"
},
title:{
    type:String,
    required:true,
},
jobTittle:{
    type:String,
    required:true,
},
company:{
    type:String,
    required:false,
},
yearsOfExperience:{
    type:Number ,
    required:false  
},
githubLink:{
    type:String,
    required:false,
},
linkedInLink:{
    type:String,
},
emergengeName:{
    type:String,
    required:false,
},
emergenceEmail:{
    type:String,
    required:true,
},
emergencePhoneNumber:{
    type:Number
},
expectation:{
    type:String
}
 },{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
)
export const eventApplicationconst=mongoose.model("eventapplicationform",eventAppSchema)