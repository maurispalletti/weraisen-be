const guideService = require('../services/guideService')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')

const registerGuide = async (userId, guide) => {
	const newGuide = guideService.registerGuide(userId, guide)

	validateGuideExists(userId, newGuide)

	return newGuide
}

const toggleActive = async (userId, isActiveGuide) => {
	const updatedGuide = guideService.toggleActive(userId, isActiveGuide)

	validateGuideExists(userId, updatedGuide)

	return updatedGuide
}

const getGuides = async (filters) => {
	const { languages, knowledge, city, age, gender } = filters
	return guideService.getGuides(languages, knowledge, city, age, gender)
}

const validateGuideExists = (id, guide) => {
	if (!guide) {
		throw new error.AppError(
			exceptions.exceptionType.guide.guideNotFound,
			'guideDelegate.validateGuideExists',
			{ key: 'userId', value: id }
		)
	}
}

module.exports = {
	registerGuide,
	toggleActive,
	getGuides,
}
