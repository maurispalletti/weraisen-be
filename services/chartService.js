// const MatchModel = require('../models/MatchModel')
// const exceptions = require('../commons/exceptions')
// const error = require('../commons/error')

// //GRÁFICO  CANTIDAD 
// const getQuantityPerMonth = async () => {

//   const queryNovember = { createdAt: { $gte: new Date(2019,10,01), $lte: new Date(2019,10,30) } }

//   const november = MatchModel.find(queryNovember);
 
//   console.log(november)

//     if (true) {
//       return november;
//     }
//     // throw new error.AppError(exceptions.exceptionType.data.dataNotFound, 'chartService.getQuantityPerMonth')
//   }

//   module.exports = {
//     getQuantityPerMonth,
//   }
