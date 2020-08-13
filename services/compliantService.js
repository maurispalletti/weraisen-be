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

module.exports = {
  createCompliant,
  updateCompliant,
  getCompliantsList,
}
