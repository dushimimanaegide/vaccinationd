import { applicationConst } from '../../models/index.js';
import Program from '../../models/programs.js';
import { catchAsync } from '../../middlewares/globaleerorshandling.js';
 
// Controller function to get all applicants in each category for all programs
export const getAllApplicantsByCategoryForAllPrograms = catchAsync(async (req, res) => {
  // Initialize models
  const ProgramModel = Program;
  const applications = applicationConst;

  // Fetch all programs
  const allPrograms = await ProgramModel.find();

  // Array to store results for each program
  const programsResults = [];

  // Loop through all programs
  for (const program of allPrograms) {
    let admittedApplicants = [];
    let noAdmittedApplicants = [];
    let addedOnWaitingListApplicants = [];

    // Loop through applicationIds of each program
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

    // Object representing details for the current program
    const programResult = {
      _id: program._id,
      admittedApplicants,
      noAdmittedApplicants,
      addedOnWaitingListApplicants,
    };

    // // Log details for the current program to the console
    // console.log(`Program: ${program._id}`);
    // console.log('Admitted Applicants:', admittedApplicants);
    // console.log('No Admitted Applicants:', noAdmittedApplicants);
    // console.log('Added on Waiting List Applicants:', addedOnWaitingListApplicants);

    // Push the programResult object to the array
    programsResults.push(programResult);
  }

  // Return the array of program results as the response
  return res.status(200).json(programsResults);
});
