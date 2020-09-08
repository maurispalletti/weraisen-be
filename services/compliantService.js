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
const years=[2019,2020,2021];
for (let i = 0; i < years.length; i++) {
const year = years[i];

const queryYear={ createdAt: { $gte: new Date(year, 00, 01), $lte: new Date(year, 11, 31) } }

const queryViolenceYear = { $and: [] }
const queryViolence ={ reason:"Violencia"}
queryViolenceYear.$and.push(queryViolence)
queryViolenceYear.$and.push(queryYear)
const violence = await CompliantModel.find(queryViolenceYear)
results.push({category: "Violencia", value: violence.length, year:year})

const querySexualYear = { $and: [] }
const querySexual ={reason: "Sexual"}
querySexualYear.$and.push(querySexual)
querySexualYear.$and.push(queryYear)
const sexual = await CompliantModel.find(querySexualYear)
results.push({category: "Acoso sexual y/o verbal", value: sexual.length, year:year})

const queryDiscriminationYear = { $and: [] }
const queryDiscrimination ={reason: "Discriminacion"}
queryDiscriminationYear.$and.push(queryDiscrimination)
queryDiscriminationYear.$and.push(queryYear)
const discrimination = await CompliantModel.find(queryDiscriminationYear)
results.push({category: "Discriminacion", value: discrimination.length, year:year})

const queryFakeYear = { $and: [] }
const queryFake={reason: "Suplantación"}
queryFakeYear.$and.push(queryFake)
queryFakeYear.$and.push(queryYear)
const fake = await CompliantModel.find(queryFakeYear)
results.push({category: "Perfil Falso", value: fake.length, year:year})

const queryOtherYear = { $and: [] }
const queryOther={reason: "Otro"}
queryOtherYear.$and.push(queryOther)
queryOtherYear.$and.push(queryYear)
const other= await CompliantModel.find(queryOtherYear)
results.push({category: "Otros motivos", value: other.length, year:year})
}
return results;



}

module.exports = {
  createCompliant,
  updateCompliant,
  getCompliantsList,
  getUsersReportedPerReason,
}
