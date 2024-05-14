import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    fullNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    otpExpiresAt: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    }
},{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  });



 export const userconst = mongoose.model('users', usersSchema);

