const matchService = require('../services/matchService')
const chatDelegate = require('../delegates/chatDelegate')
const notificationService = require('../services/notificationService')
const constants = require('../commons/constants')

const {
  notifications: {
    status: { ACTIVE },
    type: { MATCH },
  },
  matches: {
    status: { CANCELED, ENDED },
  },
} = constants

const createMatch = async ({ tourist, guide }) => {
  try {
    const match = await matchService.getActiveMatchByUserIds({ tourist, guide })

    if (match) {
      return match
    } else {
      console.log('Creating chat')
      const { id: chatId } = await chatDelegate.createChat({ tourist, guide })
      console.log(`Chat created - id ${chatId}`)

      console.log('Creating new match')
      const newMatch = await matchService.createMatch({ tourist, guide, chatId })
      console.log(`Match created - new Match ${newMatch}`)

      if (newMatch) {
        const { id: matchId, tourist: touristId, guide: guideId } = newMatch

        const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
        const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

        // Create notification for tourist
        const touristNotificationContent = {
          userId: touristId,
          status: ACTIVE,
          type: MATCH,
          message: `Tu guía ${guideName} ${guideLastName} aceptó tu solicitud de encuentro. Inicia el chat para organizar la salida.`,
          contentId: matchId,
        }
        notificationService.createNotification(touristNotificationContent)

        // Create notification for guide
        const guideNotificationContent = {
          userId: guideId,
          status: ACTIVE,
          type: MATCH,
          message: `Aceptaste la solicitud del turista ${touristName} ${touristLastName}. Ponete en contacto para organizar la salida.`,
          contentId: matchId,
        }
        notificationService.createNotification(guideNotificationContent)

        return newMatch

      } else {
        console.log(`hubo un error creando la solicitud: ${error}`)
        return null
      }
    }
  } catch (error) {
    console.error(`Error creating chat or match: ${error}`)
  }
}

const getMatchByUserIds = async ({ tourist, guide }) => {
  return matchService.getMatchByUserIds({ tourist, guide })
}









const getEndedMatchesByUserToReview = async (userId) => {

  const matches = await matchService.getActiveMatchesByUser(userId)

  if (matches.length > 0) {
    const today = new Date();
    for (let index = 0; index < matches.length; index++) {
      const match = match[index];

      if (today > match.updatedAt) {
        try {
          // update state of match and send notification here
          const updatedMatch = await matchService.updateMatchById(match.id, ENDED)


          const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch

          const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
          const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

          // Create notification review for tourist
          const touristNotificationContent = {
            userId: touristId,
            status: ACTIVE,
            type: MATCH,
            message: `El encuentro con ${guideName} ${guideLastName} finalizó. Por favor escribi una review.`,
            contentId: matchId,
          }
          notificationService.createNotification(touristNotificationContent)

          // Create notification cancelation for guide
          const guideNotificationContent = {
            userId: guideId,
            status: ACTIVE,
            type: MATCH,
            message: `El encuentro con ${touristName} ${touristLastName} finalizó. Por favor escribi una review.`,
            contentId: matchId,
          }
          notificationService.createNotification(guideNotificationContent)
        } catch (error) {
          throw error;
        }
      }
    }
  }
}

const getMatch = async id => {
  return matchService.getMatch(id)
}

const getMatchesByUser = async userId => {
  return matchService.getMatchesByUser(userId)
}

const getMatchByChatId = async chatId => {
  return matchService.getMatchByChatId(chatId)
}

const updateMatch = async (chatId, status) => {
  const updatedMatch = await matchService.updateMatch(chatId, status)

  if (updatedMatch && updatedMatch.status === CANCELED) {

    const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch

    const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
    const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

    // Create notification cancelation for tourist
    const touristNotificationContent = {
      userId: touristId,
      status: ACTIVE,
      type: MATCH,
      message: `El encuentro con ${guideName} ${guideLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(touristNotificationContent)

    // Create notification cancelation for guide
    const guideNotificationContent = {
      userId: guideId,
      status: ACTIVE,
      type: MATCH,
      message: `El encuentro con ${touristName} ${touristLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(guideNotificationContent)
  }
  return updatedMatch
}

module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getEndedMatchesByUserToReview,
  getMatchesByUser,
  getMatchByChatId,
  updateMatch,
}
