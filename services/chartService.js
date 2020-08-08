const MatchModel = require('../models/MatchModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const userModel = require('../models/userModel')
const compliantModel = require('../models/compliantModel')


    const queryJanuary = { createdAt: { $gte: new Date(2020, 0, 01), $lte: new Date(2020, 0, 31) } }
    const queryFebruary = { createdAt: { $gte: new Date(2020, 01, 01), $lte: new Date(2020, 01, 28) } }
    const queryMarch = { createdAt: { $gte: new Date(2020, 02, 01), $lte: new Date(2020, 02, 31) } }
    const queryApril = { createdAt: { $gte: new Date(2020, 03, 01), $lte: new Date(2020, 03, 30) } }
    const queryMay = { createdAt: { $gte: new Date(2020, 04, 01), $lte: new Date(2020, 04, 31) } }
    const queryJune = { createdAt: { $gte: new Date(2020, 06, 01), $lte: new Date(2020, 06, 30) } }
    const queryJuly = { createdAt: { $gte: new Date(2020, 07, 01), $lte: new Date(2020, 07, 30) } }
    const queryAugust = { createdAt: { $gte: new Date(2020, 08, 01), $lte: new Date(2020, 08, 31) } }
    const querySeptember = { createdAt: { $gte: new Date(2020, 08, 01), $lte: new Date(2020, 08, 30) } }
    const queryOctober = { createdAt: { $gte: new Date(2020, 09, 01), $lte: new Date(2020, 09, 31) } }
    const queryNovember = { createdAt: { $gte: new Date(2020, 10, 01), $lte: new Date(2020, 10, 30) } }
    const queryDecember = { createdAt: { $gte: new Date(2020, 11, 01), $lte: new Date(2020, 11, 31) } }

// //GRÁFICO  CANTIDAD 

const getMatchesPerMonth = async () => {
    try {
    const query = MatchModel.find(queryJanuary&&queryFebruary&&queryMarch&&queryApril&&queryMay&&queryJuly&&queryJune&&queryAugust&&querySeptember&&queryOctober&&queryNovember&&queryDecember)

    if (true) {
        return query;
    }} catch(error){
    throw new error.AppError(exceptions.exceptionType.data.dataNotFound, 'chartService.getMatchesPerMonth')
}
}

const getUsersCreatedPerMonth= async() =>{
try{
    
    const query = userModel.find(queryJanuary&&queryFebruary&&queryMarch&&queryApril&&queryMay&&queryJuly&&queryJune&&queryAugust&&querySeptember&&queryOctober&&queryNovember&&queryDecember)

    if (true) {
        return query;
    }} catch(error){
    throw new error.AppError(exceptions.exceptionType.data.dataNotFound, 'chartService.getUsersCreatedPerMonth')
    }
}

const getUsersReportedPerReason= async()=>{

    const querySexual ={reason= SEXUAL}
    const queryViolence ={reason= VIOLENCE}
    const queryDiscrimination ={reason= DISCRIMINATION}
    const queryFake={reason= FAKE}
    const queryPuntuality={reason= PUNTUALITY}
    const queryThread={reason= THREAD}
try{
const query=compliantModel.find(querySexual&&queryViolence&& queryThread&& queryPuntuality&&queryDiscrimination&& queryFake)

if (true) {
    return query;
}} catch(error){
throw new error.AppError(exceptions.exceptionType.data.dataNotFound, 'chartService.getUsersReportedPerReason')
}

}


module.exports = {
    getMatchesPerMonth,
    getUsersCreatedPerMonth,
    getUsersReportedPerReason,
}
