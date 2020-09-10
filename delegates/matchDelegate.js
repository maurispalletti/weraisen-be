const matchService = require('../services/matchService')
const chatDelegate = require('../delegates/chatDelegate')
const notificationService = require('../services/notificationService')
const userService = require('../services/userService')
const constants = require('../commons/constants')

const {
  notifications: {
    status: { ACTIVE },
    type: { REVIEW, ADVICE, ELECTED, APROVED, REJECTED },
  },
  matches: {
    status: { PENDING, CANCELED, ENDED, ANULATED },
  },
} = constants

const createMatch = async ({ tourist, guide, city , knowledge, matchDate}) => {
  try {
    const match = await matchService.getMatchByUserIds({ tourist, guide, matchDate })
    if (match && match.length > 0) {
      return match
    } else {
      console.log('Creating chat')
      const { id: chatId } = await chatDelegate.createChat({ tourist, guide, matchDate })
      console.log(`Chat created - id ${chatId}`)

      console.log('Creating new match')
      const newMatch = await matchService.createMatch({ tourist, guide, chatId, status: PENDING, city, knowledge, matchDate})
      console.log(`Match created - new Match ${newMatch}`)

      if (newMatch) {
        const { id: matchId, tourist: touristId, guide: guideId, city: city, knowledge:knowledge, matchDate:matchDate } = newMatch

        // const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
        const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
        
        const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)
        console.log("conocimientos"+ knowledge)
        
        // // Create notification for tourist
        // const touristNotificationContent = {
        //   userId: touristId,
        //   status: ACTIVE,
        //   type: ELECTED,
        //   message: `Tu guía ${guideName} ${guideLastName} aceptó tu solicitud de encuentro. Inicia el chat para organizar la salida.`,
        //   contentId: matchId,
        // }
        // notificationService.createNotification(touristNotificationContent)

        // Create notification for guide
        const guideNotificationContent = {
          userId: guideId,
          status: ACTIVE,
          type: ELECTED,
          message: `${touristName} ${touristLastName} te envió una solicitud. Ponete en contacto para organizar la salida.`,
          contentId: matchId,
        }
        notificationService.createNotification(guideNotificationContent)

        console.log('Operation completed');
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
      const match = matches[index];

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
            type: REVIEW,
            message: `¡Tu encuentro con ${guideName} ${guideLastName} ha finalizado! Por favor, puntualo para ayudar a futuros turistas a elegir su mejor opción.`,
            contentId: matchId,
          }
          notificationService.createNotification(touristNotificationContent)

          // Create notification cancelation for guide
          const guideNotificationContent = {
            userId: guideId,
            status: ACTIVE,
            type: REVIEW,
            message: `¡Tu encuentro con ${touristName} ${touristLastName} ha finalizado! Por favor, puntualo para ayudar a futuros guías a elegir su mejor opción.`,
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

  const matches = await matchService.getMatchesByUser(userId)
  
  console.log(matches)

  return matches

  // return matchService.getMatchesByUser(userId)
}

const getMatchByChatId = async chatId => {
  return matchService.getMatchByChatId(chatId)
}

const updateMatch = async (chatId, status) => {
  const updatedMatch = await matchService.updateMatch(chatId, status)

  // If new status is ACCEPTED, create notification saying match was accepted

  if (updatedMatch && updatedMatch.status === CANCELED) {

    const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch

    const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
    const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

    // Create notification cancelation for tourist
    const touristNotificationContent = {
      userId: touristId,
      status: ACTIVE,
      type: ADVICE,
      message: `Tu encuentro con ${guideName} ${guideLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(touristNotificationContent)

    // Create notification cancelation for guide
    const guideNotificationContent = {
      userId: guideId,
      status: ACTIVE,
      type: ADVICE,
      message: `El encuentro con ${touristName} ${touristLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(guideNotificationContent)
 
  return updatedMatch
}
}

const updateMatchStatus = async (matchId, status) => {
  const updatedMatch = await matchService.updateMatchById(matchId, status)

  // If new status is ACTIVE, create notification saying match was accepted
  if (updatedMatch && updatedMatch.status === 'Activo') {
    const { id: matchId, tourist: touristId, guide: guideId, chatId } = updatedMatch
    const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
    const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

    // Create notification new chat for tourist
    const touristNotificationContent = {
      userId: touristId,
      status: ACTIVE,
      type: APROVED,
      message: `Tu guía ${guideName} ${guideLastName} aceptó la solicitud de encuentro. Comenzá a chatear para planear tu próxima aventura.`,
      contentId: chatId,
    }
    notificationService.createNotification(touristNotificationContent)


    // Create notification new chat for guide
    const guideNotificationContent = {
      userId: guideId,
      status: ACTIVE,
      type: APROVED,
      message: `Aceptaste el encuentro con ${touristName} ${touristLastName}. Comenzá a chatear para planear su próxima aventura.`,
      contentId: chatId,
    }
    notificationService.createNotification(guideNotificationContent)
  }

  // This notification is for Canceled requests
  if (updatedMatch && updatedMatch.status === CANCELED) {
    const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch
    const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
    const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

    // Create notification cancelation for tourist
    const touristNotificationContent = {
      userId: touristId,
      status: ACTIVE,
      type: ADVICE,
      message: `Tu encuentro con ${guideName} ${guideLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(touristNotificationContent)

    // Create notification cancelation for guide
    const guideNotificationContent = {
      userId: guideId,
      status: ACTIVE,
      type: ADVICE,
      message: `El encuentro con ${touristName} ${touristLastName} fue cancelado.`,
      contentId: matchId,
    }
    notificationService.createNotification(guideNotificationContent)
  }

  // This notification is for Anulated requests
if (updatedMatch && updatedMatch.status === ANULATED) {
  const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch
  const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
  const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

  // Create notification anulated for tourist
  const touristNotificationContent = {
    userId: touristId,
    status: ACTIVE,
    type: REJECTED,
    message: `${guideName} ${guideLastName} rechazó tu solicitud de encuentro.`,
    contentId: matchId,
  }
  notificationService.createNotification(touristNotificationContent)
}


  // This notification is for Ended requests
  if (updatedMatch && updatedMatch.status === ENDED) {
    const { id: matchId, tourist: touristId, guide: guideId } = updatedMatch
    const { firstName: guideName, lastName: guideLastName } = await userService.findUserById(guideId)
    const { firstName: touristName, lastName: touristLastName } = await userService.findUserById(touristId)

    // Create notification review for tourist
    const touristNotificationContent = {
      userId: touristId,
      status: ACTIVE,
      type: REVIEW,
      message: `¡Tu encuentro con ${guideName} ${guideLastName} ha finalizado! Por favor, puntualo para ayudar a futuros turistas a elegir su mejor opción.`,
      contentId: matchId,
    }
    notificationService.createNotification(touristNotificationContent)

    // Create notification cancelation for guide
    const guideNotificationContent = {
      userId: guideId,
      status: ACTIVE,
      type: REVIEW,
      message: `¡Tu encuentro con ${touristName} ${touristLastName} ha finalizado! Por favor, puntualo para ayudar a futuros guías a elegir su mejor opción.`,
      contentId: matchId,
    }
   
    notificationService.createNotification(guideNotificationContent)
  }
  return updatedMatch
}


const updateMatchDate = async (matchId, matchDate) => {
  const updatedMatch = await matchService.updateMatchByIdDate(matchId, matchDate)
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
  updateMatchStatus,
  updateMatchDate
}
