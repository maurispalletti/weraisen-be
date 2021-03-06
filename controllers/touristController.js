const touristDelegate = require('../delegates/touristDelegate')
const validators = require('../commons/validators')

const updateTourist = async (req, res) => {
  
  const requiredParams = [
    'firstName',
    'lastName',
    'identification',
    'age',
    'city',
    'gender',
  ]

  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, requiredParams)

  const tourist = req.body

  const updatedTourist = await touristDelegate.updateTourist(req.params.userId, tourist)
  res.json(updatedTourist)
}

module.exports = {
  updateTourist
}
