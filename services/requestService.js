const RequestModel = require('../models/RequestModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const { requests: { status: { CREATED, CONFIRMED, CANCELED } } } = constants;

const getRequestsByUserId = async (userId) => {
  const requests = await RequestModel.find({userId})
  if (requests && requests.length) {
    return requests
  }
  return null
}

const createRequest = async (requestData) => {
  const newRequest = new RequestModel(requestData)
  const savedRequest = await newRequest.save({ new: true })
  if (savedRequest) {
    return savedRequest
  }
  throw new error.AppError(exceptions.exceptionType.request.cannotCreateRequest, 'requestService.createRequest')
}

const updateRequest = async (requestId, status) => {
  try {
    const updatedRequest = await RequestModel.findByIdAndUpdate(requestId, { $set: { status } }, { new: true })
    return updatedRequest
  } catch (error) {
    console.log(`!@!!!!!!!!@!@#!#!@#!@#@242342374234234728342123#`)
    console.log(error)
  }

}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
