const chatDelegate = require('../delegates/chatDelegate')
const validators = require('../commons/validators')

const createChat = async (req, res) => {
  const requiredParams = [
    'tourist',
    'guide'
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const { tourist, guide } = req.body

  const chat = await chatDelegate.createChat({ tourist, guide })
  res.json(chat)
}

const addMessage = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['id'])
  validators.validateRequiredKeys(req.body, ['messages'])

  const { id } = req.params
  const { messages } = req.body

  const chat = await chatDelegate.addMessage(id, messages)
  res.json(chat)
}

const getChat = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['id'])

  const { id } = req.params

  const chat = await chatDelegate.getChat(id)
  res.json(chat)
}

const getConversation = async (req, res) => {
  validators.validateRequiredKeys(req.body, ['guideId', 'touristId'])

  const { guideId, touristId } = req.body;

  // extraer solo el array de mensajes de aca, en base a los id de ambos usuarios
  const chat = await chatDelegate.getChatByUserIds({ guideId, touristId })
  res.json(chat)
}

module.exports = {
  createChat,
  addMessage,
  getChat,
  getConversation,
}
