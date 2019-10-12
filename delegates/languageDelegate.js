const languageService = require('../services/languageService')

const getLanguages = async () => {
	
	return languageService.getLanguages()
}

const postLanguage = newLanguage => {
	return languageService.createLanguage(newLanguage)
}

module.exports = {
	getLanguages,
	postLanguage,
}