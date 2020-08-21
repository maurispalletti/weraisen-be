const CompliantModel = require('../models/compliantModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const createCompliant = async compliant => {
  const newCompliant = new CompliantModel(compliant)
  const savedCompliant = await newCompliant.save({ new: true })
  if (savedCompliant) {
    return savedCompliant 
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

  
const queryViolence ={ reason:"Violencia"}
const violence = await CompliantModel.find(queryViolence)
results.push({category: "Violencia", value: violence.length})

const querySexual ={reason: "Sexual"}
const sexual = await CompliantModel.find(querySexual)
results.push({category: "Acoso sexual y/o verbal", value: sexual.length})

const queryDiscrimination ={reason: "Discriminacion"}
const discrimination = await CompliantModel.find(queryDiscrimination)
results.push({category: "Discriminacion", value: discrimination.length})


const queryFake={reason: "Suplantación"}
const fake = await CompliantModel.find(queryFake)
results.push({category: "Perfil Falso", value: fake.length})

const queryOther={reason: "Otro"}
const other= await CompliantModel.find(queryOther)
results.push({category: "Otros motivos", value: other.length})

return results;



}

module.exports = {
  createCompliant,
  updateCompliant,
  getCompliantsList,
  getUsersReportedPerReason,
}
