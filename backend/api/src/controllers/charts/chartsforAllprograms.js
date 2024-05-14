import { applicationConst } from '../../models/index.js';
import Program from '../../models/programs.js';
import { catchAsync } from '../../middlewares/globaleerorshandling.js';

// Controller function to count applications by category for all programs
export const chartsforallprograms = catchAsync(async (req, res) => {
  // Initialize models
  const ProgramModel = Program;
  const applications = applicationConst;

  // Fetch all programs
  const allPrograms = await ProgramModel.find();

  // Array to store results for each program
  const programsResults = [];

  // Loop through all programs
  for (const program of allPrograms) {
    let admitted = 0,
      noAdmitted = 0,
      addedOnWaitingList = 0;

    // Loop through applicationIds of each program
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

    // Object representing counts for the current program
    const programResult = {
      name: program.programName,
      totalAdmitted: admitted,
      totalNoAdmitted: noAdmitted,
      totalAddedOnWaitingList: addedOnWaitingList,
    };

    // Log counts for the current program to the console
    // console.log(`Program: ${name}`);
    // console.log('Applications by category (noAdmitted):', noAdmitted);
    // console.log('Applications by category (addedOnWaitingList):', addedOnWaitingList);
    // console.log('Applications by category (admitted):', admitted);

    // Push the programResult object to the array
    programsResults.push(programResult);
  }

  // Return the array of program results as the response
  return res.status(200).json(programsResults);
});
