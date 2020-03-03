const requestDelegate = require('../delegates/requestDelegate')
const validators = require('../commons/validators')

const getRequestsByUserId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.body

  const requests = await requestDelegate.getRequestsByUserId(userId)
  res.json(requests)
}

const createRequest = async (req, res) => {
  const requiredParams = [
    'userId',
    'userRequestedId',
    'status',
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const newRequest = await requestDelegate.createRequest(req.body)
  res.json(newRequest)
}

const updateRequest = async (req, res) => {

  const requiredParams = [
    'requestId',
    'status',
  ]
  
  console.log(req.body)
  
  // cambiar -- aca sacar el requestId del path no del body
  const { requestId, status } = req.body

  validators.validateRequiredKeys(req.body, requiredParams)

  const updatedRequest = await requestDelegate.updateRequest(requestId, status)
  res.json(updatedRequest)
}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
