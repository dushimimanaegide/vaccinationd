import {
  applicationConst,
 
} from '../../models/index.js'
export const getAllApplicants = async (req, res) => {
  try {
    let query = {};

    // Check if id is provided, and add it to the query
    if (req.params.id) {
      query._id = req.params.id;
    
    }

    // Check if admitted parameter is provided, and add it to the query
    if (req.params.admitted) {
      query.isAllowed = 'admitted';
    }

    // Check if noAdmitted parameter is provided, and add it to the query
    if (req.params.noAdmitted) {
      query.isAllowed = 'noAdmitted';
    }

    // Check if addedOnwaitingList parameter is provided, and add it to the query
    if (req.params.addedOnwaitingList) {
      query.isAllowed = 'addedOnwaitingList';
    }

    let applicants = await applicationConst.find(query);

    if (!applicants || applicants.length === 0) {
      // Generate a message based on the parameters
      let message = '';
      if (req.params.id) {
        message = `No applicant with ID ${req.params.id} found.`;
      } else if (req.params.admitted) {
        message = 'No applicants with admitted status found.';
      } else if (req.params.noAdmitted) {
        message = 'No applicants with noAdmitted status found.';
      } else if (req.params.addedOnwaitingList) {
        message = 'No applicants with addedOnwaitingList status found.';
      } else {
        message = 'No data found.';
      }

      return res.status(404).json({ message: message });
    }

    // Generate a message based on the parameters
    let message = '';
    if (req.params.id) {
      message = `Applicant with ID ${req.params.id} retrieved successfully.`;
      let applicant = await applicationConst.findById(req.params.id);
      return res.status(200).json({
        message: message,
        applicants_List: applicant,
      });
    } else if (req.params.admitted) {
      message = 'Applicants with admitted status retrieved successfully.';
    } else if (req.params.noAdmitted) {
      message = 'Applicants with noAdmitted status retrieved successfully.';
    } else if (req.params.addedOnwaitingList) {
      message = 'Applicants with addedOnwaitingList status retrieved successfully.';
    } else {
      message = 'All applicants retrieved successfully.';
    }

    return res.status(200).json({
      message: message,
      applicants_List: applicants,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

