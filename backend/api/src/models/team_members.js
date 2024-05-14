import mongoose from 'mongoose';
const teamMemberSchema = new mongoose.Schema({
  FULL_NAMES: String,
  TITLE: String,
  POSITION: String,
  SOCIAL_MEDIAS: String,
  EMAIL: String,
  mainImage:{type:String}
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
