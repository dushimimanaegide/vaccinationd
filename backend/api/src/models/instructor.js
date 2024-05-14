import mongoose from 'mongoose'; 
// Destructure Schema from mongoose
const { Schema } = mongoose;
// Define the schema for the "instructors" collection
const instructorSchema = new Schema({
  // Unique identifier for the instructor
  INSTRUCTOR_ID: String,
  // Instructor's first name
  FirstName: String,
  // Instructor's last name
  LastName: String,
  // Instructor's email address
  Email: String,
  // Instructor's phone number
  Phone: String,
  // Instructor's address
  Address: String,
  // Instructor's bio or description
  Bio: String,
  // Skills or expertise of the instructor (as an array)
  Skills: [String],
  // Courses taught by the instructor (as an array)
  CoursesTaught: [String],
  
  profile_picture: String,
  
  Wage: {
    // Wage amount
    Amount: Number,
    // Frequency of wage payment (e.g., monthly, hourly)
    Frequency: String
 },
  // Array of courses taught by the instructor
  TeachedCourses: [String]
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});
// Create a model based on the schema
const Instructor = mongoose.model('Instructor', instructorSchema);
// Export the model for use in other files
export default Instructor;
