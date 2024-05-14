// import { applicationConst } from '../../models/index.js'
// import Program from '../../models/programs.js'
// import { catchAsync } from '../../middlewares/globaleerorshandling.js'

// // Controller function to count applications by category for a specific program
// export const countApplicationsByCategory = catchAsync(async (req, res) => {
//   // Extract programId from request parameters
//   let programId = req.params.programId

//   // Initialize models
//   let ProgramModel = Program
//   let applications = applicationConst

//   // Fetch program information
//   const program = await ProgramModel.findById(programId)
//   if (!program) {
//     throw new Error('Program not found')
//   }
//   var admitted=0,noAdmitted=0,addedOnWaitingList=0;
   
   
//   program.applicationIds.forEach(async appId => {
//     const application = await applications.findOne({ _id: appId })
//     console.log(application.isAllowed)
//     if (application.isAllowed == 'admitted') {
//         admitted++;
//     }
//     if (application.isAllowed == 'noAdmitted') {
//     noAdmitted++;  
  
//     }

//     if (application.isAllowed == 'addedOnWaitingList') {
//      addedOnWaitingList++
  
//     }
//   })

 

//   // Log counts for each category to the console
//   console.log('Applications by category:',noAdmitted )
//   console.log('Applications by category:',addedOnWaitingList )
//   console.log('Applications by category:',admitted )

//   // Return the categoriesCount object as the response
//   return res.status(200).json({admitted,
//     addedOnWaitingList,
//     noAdmitted
// })
// })

import { applicationConst } from '../../models/index.js';
import Program from '../../models/programs.js';
import { catchAsync } from '../../middlewares/globaleerorshandling.js';

// Controller function to count applications by category for a specific program
export const countApplicationsByCategory = catchAsync(async (req, res) => {
  // Extract programId from request parameters
  const programId = req.params.programId;

  // Initialize models
  const ProgramModel = Program;
  const applications = applicationConst;

  // Fetch program information
  const program = await ProgramModel.findById(programId);
  if (!program) {
    throw new Error('Program not found');
  }

  let admitted = 0,
    noAdmitted = 0,
    addedOnWaitingList = 0;
  for (const appId of program.applicationIds) {
    const application = await applications.findOne({ _id: appId });
    if (application.isAllowed == 'admitted') {
      admitted++;
    }
    if (application.isAllowed == 'noAdmitted') {
      noAdmitted++;
    }
    if (application.isAllowed == 'addedOnWaitingList') {
      addedOnWaitingList++;
    }
  }
  return res.status(200).json({
    admitted:admitted,
    addedOnWaitingList:addedOnWaitingList,
    noAdmitted:noAdmitted,
  });
});

