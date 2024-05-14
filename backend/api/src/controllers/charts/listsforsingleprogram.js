import { applicationConst } from '../../models/index.js';
import Program from '../../models/programs.js';
import { catchAsync } from '../../middlewares/globaleerorshandling.js';

// Controller function to list all applicants in each category for a specific program
export const listApplicantsByCategory = catchAsync(async (req, res) => {
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

  // Arrays to store applicants in each category
  const admittedApplicants = [];
  const noAdmittedApplicants = [];
  const addedOnWaitingListApplicants = [];

  // Loop through applicationIds of the program
  for (const appId of program.applicationIds) {
    const application = await applications.findOne({ _id: appId });

    // Categorize applicants based on their status
    if (application.isAllowed == 'admitted') {
      admittedApplicants.push(application);
    }

    if (application.isAllowed == 'noAdmitted') {
      noAdmittedApplicants.push(application);
    }

    if (application.isAllowed == 'addedOnWaitingList') {
      addedOnWaitingListApplicants.push(application);
    }
  }

  // Return the arrays of applicants for each category as the response
  return res.status(200).json({
    admittedApplicants,
    noAdmittedApplicants,
    addedOnWaitingListApplicants,
  });
});
