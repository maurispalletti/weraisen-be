const matchDelegate = require('../delegates/matchDelegate')
const validators = require('../commons/validators')

const createMatch = async (req, res) => {
  const requiredParams = [
    'tourist',
    'guide',
    'status',
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const { tourist, guide } = req.body

  const match = await matchDelegate.createMatch({ tourist, guide })
  res.json(match)
}

const getMatchByUserIds = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['tourist', 'guide'])

  const { tourist, guide } = req.body

  const match = await matchDelegate.getMatchByUserIds({ tourist, guide })
  res.json(match)
}

const getMatch = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['id'])

  const { id } = req.params

  const match = await matchDelegate.getMatch(id)
  res.json(match)
}

const getMatchesByUser = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params
  const matches = await matchDelegate.getMatchesByUser(userId)
  res.json(matches)
}

module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
}
