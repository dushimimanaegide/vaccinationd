
import mongoose from 'mongoose';
import { formattedDate } from '../../utils/datefunctin.js';
const { Schema } = mongoose;
const programSchema = new Schema({
    programName: { type: String, required: false },
    description: { type: String, required: false },
    images: [{ type: String, required: false }],
    applicationIds:[{type: mongoose.Schema.Types.ObjectId,
        ref:'applications',
        required:false}],
    mainImage: { type: String, required: false },
    applicants: [{ type: Object, required: false }],
    duration: { type: String, required: false },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false },
    prerequisites: { type: String, required: false },
    level: { type: String, required: false },
    creditHours: { type: Number, required: false },
    fee: { type: String, required: false },
    location: { type: String, required: false },
    enrollmentLimit: { type:String, required: false },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "closed",
        required: false
    },
    applicationsId:[{ type: mongoose.Schema.Types.ObjectId, ref: 'applications' }],
    totalApplicants: { type: Number, default: 0 },
    totalAccepted: { type: Number, default: 0 },
    totalDenied: { type: Number, default: 0 },
    totalonthewaitinglist: { type: Number, default: 0 },
},
{
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  });

programSchema.pre('save', function (next) {
    const currentDate = new Date();
    if (this.endDate && this.endDate < currentDate && this.status === 'open') {
        this.status = 'closed';
    }
    next();
});

const Program = mongoose.model('Program', programSchema);

export default Program;
