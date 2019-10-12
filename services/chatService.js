const ChatModel = require('../models/chatModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

const createChat = async ({ user1, user2 }) => {
  const newChat = new ChatModel({ user1, user2 })
  const savedChat = await newChat.save({ new: true })
  if (savedChat) {
    return savedChat
  }
  throw new error.AppError(exceptions.exceptionType.chat.cannotCreateChat, 'chatService.createChat')
}

const addMessage = async (id, messages) => {
  return ChatModel.findByIdAndUpdate(id, { $set: { messages } }, { new: true })
}

const getChatByUserIds = async ({ user1, user2 }) => {
  const chat = await ChatModel.findOne({ user1, user2 })
  if (chat) {
    return chat
  }
  return null
}

const getChat = async id => {
  const chat = ChatModel.findById(id)
  if (chat) {
    return chat
  }
  throw new error.AppError(exceptions.exceptionType.chat.notFound, 'chatService.getChat')
}

module.exports = {
  createChat,
  addMessage,
  getChat,
  getChatByUserIds,
}
