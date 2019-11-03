const matchService = require('../services/matchService')
const chatDelegate = require('../delegates/chatDelegate')

const createMatch = async ({ tourist, guide }) => {
  try {
    const { id: chatId } = await chatDelegate.createChat({ tourist, guide })

    return matchService.createMatch({ tourist, guide, chatId })

  } catch (error) {
    console.error(`Error creating chat or match`)
  }
}

const getMatchByUserIds = async ({ tourist, guide }) => {
  return matchService.getMatchByUserIds({ tourist, guide })
}

const getMatch = async id => {
  return matchService.getMatch(id)
}

const getMatchesByUser = async userId => {
  return matchService.getMatchesByUser(userId)
}

module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
}
