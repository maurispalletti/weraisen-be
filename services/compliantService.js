const CompliantModel = require('../models/compliantModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const createCompliant = async compliant => {
  const newCompliant = new CompliantModel(compliant)
  const savedCompliant = await newCompliant.save({ new: true })
  if (savedCompliant) {
    return { id: savedCompliant.id }
  }
  throw new error.AppError(exceptions.exceptionType.compliant.cannotCreateCompliant, 'compliantService.createCompliant')
}

const updateCompliant = async (id, status) => {
  return CompliantModel.findByIdAndUpdate(id, { $set: { status } }, { new: true })
}

const getCompliantsList = async (status) => {
  const pendingCompliances = await CompliantModel.find({ status })

  console.log(pendingCompliances)

  return pendingCompliances
}

const getUsersReportedPerReason= async()=>{

let results=[];
try{
  
const queryViolence ={reason: "Violencia"}
const violence = await CompliantModel.find(queryViolence)
results.push({reason: "Violencia", value: violence.length})

const querySexual ={reason: SEXUAL}
const sexual = await CompliantModel.find(querySexual)
results.push({reason: "Acoso sexual y/o verbal", value: sexual.length})

const queryDiscrimination ={reason: DISCRIMINATION}
const discrimination = await CompliantModel.find(queryDiscrimination)
results.push({reason: "Discriminación", value: discrimination.length})

const queryPuntuality ={reason: PUNTUALITY}
const puntuality = await CompliantModel.find(queryPuntuality)
results.push({reason: "Puntualidad", value: puntuality.length})

const queryFake={reason: FAKE}
const fake = await CompliantModel.find(queryFake)
results.push({reason: "Perfil Falso", value: fake.length})

const queryThreat={reason: THREAT}
const threat = await CompliantModel.find(queryThreat)
results.push({reason: "Perfil Falso", value: threat.length})

return results;

}catch (error){
  throw new error.AppError(exceptions.exceptionType.match.queryFailed, 'compliantService.getUsersReportedPerReason')
}

}

module.exports = {
  createCompliant,
  updateCompliant,
  getCompliantsList,
  getUsersReportedPerReason,
}
