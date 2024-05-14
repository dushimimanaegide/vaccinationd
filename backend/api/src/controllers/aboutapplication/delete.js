import {
  applicationConst,
  
} from '../../models/index.js'
export const deleteApplication = async (req, res) => {
  let id = req.params.id
  let applicant = await applicationConst.findByIdAndDelete(id)

  if (!applicant) {
    return res.status(404).json({
      message: `No applicant with the id ${id} found.`
    })
  }
  return res.status(200).json({
    message: 'The applicant was deleted successfully.',
    information_of_applicant: applicant
  })
}
