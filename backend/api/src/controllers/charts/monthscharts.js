 import { eventApplicationconst,applicationConst,classConst,contactConst,Machine} from "../../models/index.js";
import moment from "moment";
import Program from "../../models/programs.js";
import eventConst from "../../models/event.js";
import { userconst } from "../../models/index.js";
// const getCountPerMonth = async (req, res) => {
//     try {
//       const result = await applicationConst.aggregate([
//         {
//           $group: {
//             _id: {
//               month: {
//                 $dateToString: {
//                   date: '$createdDate',
//                   format: '%m',
//                 },
//               },
//             },
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $sort: { '_id.month': 1 },
//         },
//       ]);
  
//       const resultWithMonthNames = result.map(entry => ({
//         month: moment().month(parseInt(entry._id.month) - 1).format('MMMM'),
//         monthNumber: parseInt(entry._id.month),
//         count: entry.count,
//       }));
  
//       // Check for months with zero applicants
//       const allMonths = moment.months();
//       const zeroApplicantMonths = allMonths.filter(month => {
//         return !resultWithMonthNames.some(entry => entry.month === month);
//       });
  
//       // Add months with zero applicants to the result
//       zeroApplicantMonths.forEach(month => {
//         resultWithMonthNames.push({
//           month,
//           monthNumber: allMonths.indexOf(month) + 1,
//           count: 0,
//         });
//       });
  
//       // Sort the result again based on month number
//       resultWithMonthNames.sort((a, b) => a.monthNumber - b.monthNumber);
  
//       res.json({
//         success: true,
//         message: 'Count per month retrieved successfully',
//         data: resultWithMonthNames,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching count per month',
//         error: error.message,
//       });
//     }
//   };
  
//   export { getCountPerMonth };



import { catchAsync } from "../../middlewares/globaleerorshandling.js";

const getCountPerMonthFromModel = (model, dateField) => {
  return catchAsync(async (req, res, next) => {
    try {
      const result = await model.aggregate([
        {
          $group: {
            _id: {
              month: {
                $dateToString: {
                  date: `$${dateField}`,
                  format: '%m',
                },
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.month': 1 },
        },
      ]);

      const resultWithMonthNames = result.map((entry) => ({
        month: moment().month(parseInt(entry._id.month) - 1).format('MMMM'),
        monthNumber: parseInt(entry._id.month),
        count: entry.count,
      }));

      // Check for months with zero entries
      const allMonths = moment.months();
      const zeroEntryMonths = allMonths.filter((month) => {
        return !resultWithMonthNames.some((entry) => entry.month === month);
      });

      // Add months with zero entries to the result
      zeroEntryMonths.forEach((month) => {
        resultWithMonthNames.push({
          month,
          monthNumber: allMonths.indexOf(month) + 1,
          count: 0,
        });
      });

      // Sort the result again based on month number
      resultWithMonthNames.sort((a, b) => a.monthNumber - b.monthNumber);

      res.json({
        success: true,
        message: 'Count per month retrieved successfully',
        data: resultWithMonthNames,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching count per month',
        error: error.message,
      });
    }
  });
};

export const getCountPerMonthForUsers = getCountPerMonthFromModel(userconst, 'createdDate');
//export const getCountPerMonthForTours = getCountPerMonthFromModel(tourconst, 'createdDate');
export const getCountPerMonthForApplications = getCountPerMonthFromModel(applicationConst, 'createdDate');
export const getCountPerMonthForClasses = getCountPerMonthFromModel(classConst, 'createdDate');
export const getCountPerMonthForPrograms = getCountPerMonthFromModel(Program, 'createdDate');
export const getCountPerMonthForEvents = getCountPerMonthFromModel(eventConst, 'createdDate');
export const getCountPerMonthForMachines = getCountPerMonthFromModel(Machine, 'createdDate');