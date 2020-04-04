const requestDelegate = require('../delegates/requestDelegate')
const validators = require('../commons/validators')

const getRequestsByUserId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params

  const requests = await requestDelegate.getRequestsByUserId(userId)
  res.json(requests)
}

const createRequest = async (req, res) => {
  const requiredParams = [
    'userId',
    'userRequestedId',
    'status',
  ]

  validators.validateRequiredKeys(req.body, requiredParams)

  const newRequest = await requestDelegate.createRequest(req.body)
  res.json(newRequest)
}

const updateRequest = async (req, res) => {  
  const { status } = req.body
  const { requestId } = req.params

  validators.validateRequiredKeys(req.body, ['status'])
  validators.validateRequiredKeys(req.params, ['requestId'])

  const updatedRequest = await requestDelegate.updateRequest(requestId, status)
  res.json(updatedRequest)
}

module.exports = {
  getRequestsByUserId,
  createRequest,
  updateRequest,
}
