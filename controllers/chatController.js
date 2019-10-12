const chatDelegate = require('../delegates/chatDelegate')
const validators = require('../commons/validators')

const createChat = async (req, res) => {
  const requiredParams = [
    'user1',
    'user2'
  ]

  console.log(req.body)

  validators.validateRequiredKeys(req.body, requiredParams)

  const { user1, user2 } = req.body

  const chat = await chatDelegate.createChat({ user1, user2 })
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

module.exports = {
  createChat,
  addMessage,
  getChat,
}
