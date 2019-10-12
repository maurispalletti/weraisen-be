const chatService = require('../services/chatService')

const createChat = async ({ user1, user2 }) => {
	const createdChat = await getChatByUserIds({user1, user2})

	if (!createdChat) {
		return chatService.createChat({ user1, user2 })
	} else {
		return createdChat;
	}
}

const addMessage = async (id, messages) => {
	return chatService.addMessage(id, messages)
}

const getChat = async id => {
	return chatService.getChat(id)
}

const getChatByUserIds = async ({ user1, user2 }) => {
	return chatService.getChatByUserIds({ user1, user2 })
}

module.exports = {
	createChat,
	addMessage,
	getChat
}
