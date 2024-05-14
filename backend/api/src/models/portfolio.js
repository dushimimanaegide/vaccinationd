import mongoose from 'mongoose';

const { Schema } = mongoose;

const portfoliosSchema = new Schema({
    portfolioCategory:{
        type:String,
        default:"portfolio",
        required:false
    },

    portfolioImages:[{type:String}],
},
{
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
})
const portfolioConst = mongoose.model('portfolio', portfoliosSchema);

export default portfolioConst;
