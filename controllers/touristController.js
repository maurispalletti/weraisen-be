const touristDelegate = require('../delegates/touristDelegate')
const validators = require('../commons/validators')

const updateTourist = async (req, res) => {
  
  const requiredParams = [
    'firstName',
    'lastName',
    'gender',    
  ]

  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, requiredParams)

  const tourist = req.body

  const updatedTourist = await touristDelegate.updateTourist(req.params.userId, tourist)
  res.json(updatedTourist)
}

const updateGuiaActivo = async (req, res) => { 
  

  validators.validateRequiredKeys(req.params, ['userId'])  

  const tourist = req.body
  console.log(req.body);

  const updatedTourist = await touristDelegate.updateGuiaActivo(req.params.userId, tourist)
  res.json(updatedTourist)
}

module.exports = {
  updateTourist,
  updateGuiaActivo
}
