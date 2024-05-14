import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    images:[{type:String}],
    description: {
        type: String,
        required: true
    },
    description:{type:String},  
      duration: {
        type: Number,
        required: true
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    prerequisites: [{
        type: String
    }],
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
},
{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  });

 export const Course = mongoose.model('Course', courseSchema);

