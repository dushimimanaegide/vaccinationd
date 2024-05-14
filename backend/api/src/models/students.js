
import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
  fulnames: String,
  EMAIL: String,
  PHONE_number: String,
  courses: [
    {
      COURSE_ID: String,
      PROGRAMME_ID: String,
      PRODUCT_ID: String,
      APPLICATION_ID: String
    }
  ]
},{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
