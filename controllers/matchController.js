const matchDelegate = require('../delegates/matchDelegate')
const validators = require('../commons/validators')

const createMatch = async (req, res) => {
  const requiredParams = [
    'tourist',
    'guide',
    'city',
    'knowledge',
    'matchDate'
  ]

  validators.validateRequiredKeys(req.body, requiredParams)

  const { tourist, guide, city , knowledge, matchDate} = req.body

  const match = await matchDelegate.createMatch({ tourist, guide, city, knowledge, matchDate })
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

const getEndedMatchesByUserToReview = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params
  const matches = await matchDelegate.getEndedMatchesByUserToReview(userId)

  res.json(matches)
}

const getMatchByChatId = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['chatId'])

  const { chatId } = req.params
  
  const match = await matchDelegate.getMatchByChatId(chatId)

  res.json(match)
}

const updateMatch = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['chatId'])
  validators.validateRequiredKeys(req.body, ['status'])

  const { chatId } = req.params
  const { status } = req.body

  const match = await matchDelegate.updateMatch(chatId, status)
  res.json(match)
}

const updateMatchStatus = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['matchId'])
  validators.validateRequiredKeys(req.body, ['status'])

  const { matchId } = req.params
  const { status } = req.body

  const match = await matchDelegate.updateMatchStatus(matchId, status)
  res.json(match)
}

const updateMatchDate = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['matchId'])
  validators.validateRequiredKeys(req.body, ['matchDate'])

  const { matchId } = req.params
  const { matchDate } = req.body

  const match = await matchDelegate.updateMatchDate(matchId, matchDate)
  res.json(match)
}


module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
  getMatchByChatId,
  updateMatch,
  getEndedMatchesByUserToReview,
  updateMatchStatus,
  updateMatchDate
}
