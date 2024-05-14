import mongoose, { Schema } from 'mongoose';

const applicationSchema = new mongoose.Schema({
    desccription: { type: String, required: false },
    programId:{  type: mongoose.Schema.Types.ObjectId,
    ref:'Program',
    required:false},
    fullNames: { type: String, required: false },
    images: [{ type: String, required: false }],
    email: { type: String, required: false },
phoneNumber: { type: String, required: false },
    yearOfBirth: { type: Number, required: false },
    programName: { type: String, required: false },
    gender: { type: String, required: false },
    ageRange: { type: String, required: false },
    province: { type: String, required: false },
    district: { type: String, required: false },
    sector: { type: String, required: false },
    village: { type: String, required: false },
    educationalLevel: { type: String, required: false },
    certificateOfRecentlyEducationLevel: { type: String, required: false },
    jobStatus: { type: String, required: false },
    fieldOfStudy: { type: String, required: false },
    previouslyParticipated: { type: String, required: false },
    innovationDescription: { type: String, required: false },
    businessIdeaFile: { type: String, required: false },
    consent: { type: String, required: false },
    howDidYouheardofus: { type: String, required: false },
    isAllowed: { type: String, default: "noAdmitted", required: false },
    reasonForIsAllowedDEsicion: { type: String, required: false },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    isAllowed: {
        type: String,
        enum: ['admitted', 'noAdmitted', 'addedOnWaitingList'],
        default: 'noAdmitted',
        required: false,
    },
    
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

export const applicationConst = mongoose.model('applications', applicationSchema);

