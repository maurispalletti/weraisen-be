const MatchModel = require('../models/MatchModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

const createMatch = async ({ tourist, guide }) => {
  const newMatch = new MatchModel({ tourist, guide, status, chatId })

  const savedMatch = await newMatch.save({ new: true })

  if (savedMatch) {
    return savedMatch
  }
  throw new error.AppError(exceptions.exceptionType.match.createMatch, 'matchService.createMatch')
}

const getMatchByUserIds = async ({ tourist, guide }) => {
  const match = await MatchModel.findOne({ tourist, guide })

  if (match) {
    return match
  }
  return null
}

const getMatch = async id => {
  const match = MatchModel.findById(id)
  if (match) {
    return match
  }
  throw new error.AppError(exceptions.exceptionType.match.notFound, 'matchService.getMatch')
}

const getMatchesByUser = async userId => {
  const query = { $or: [{ tourist: userId }, { guide: userId }] }

  const matches = await MatchModel.find(query)

  if (matches) {
    return matches
  }
  return []
}

module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
}
