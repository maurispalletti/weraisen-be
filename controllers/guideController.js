const guideDelegate = require('../delegates/guideDelegate')
const validators = require('../commons/validators')

const registerGuide = async (req, res) => {
  const requiredParams = [
    'description',
    'languages',
    'knowledge',
  ]

  validators.validateRequiredKeys(req.params, ['userId'])
  validators.validateRequiredKeys(req.body, requiredParams)

  const guide = req.body
  guide['isActiveGuide'] = true

  const newGuide = await guideDelegate.registerGuide(req.params.userId, guide)
  res.json(newGuide)
}

const toggleActive = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const updatedGuide = await guideDelegate.toggleActive(req.params.userId, req.body.isActiveGuide)
  res.json(updatedGuide)
}

const getGuides = async (req, res) => {
 const filters = req.body
   const guides = await guideDelegate.getGuides(filters)
  res.json(guides)
}

module.exports = {
  registerGuide,
  toggleActive,
  getGuides,
}
