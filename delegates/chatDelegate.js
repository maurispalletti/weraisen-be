const chatService = require('../services/chatService')

const createChat = async ({ tourist, guide }) => {

	const createdChat = await getChatByUserIds({ tourist, guide })

	if (!createdChat) {
		return chatService.createChat({ tourist, guide })
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

const getChatByUserIds = async ({ tourist, guide }) => {
	return chatService.getChatByUserIds({ tourist, guide })
}

module.exports = {
	createChat,
	addMessage,
	getChat,
	getChatByUserIds,
}
