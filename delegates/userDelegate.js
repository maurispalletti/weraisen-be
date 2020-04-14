const util = require('util')
const fs = require('fs')
const config = require('config')

const userService = require('../services/userService')
const compliantService = require('../services/compliantService')
const notificationService = require('../services/notificationService')

const s3Service = require('../services/s3Service')

const constants = require('../commons/constants')

const {
  notifications: {
    status: { ACTIVE },
    type: { COMPLIANT },
  },
} = constants

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const signup = newUser => {
	return userService.createUser(newUser)
}

const createCompliant = async newCompliant => {
	const compliant = await compliantService.createCompliant(newCompliant)

	if (compliant) {
		// Create notification for accused
		const compliantNotificationContent = {
			userId: compliant.accusedId,
			status: ACTIVE,
			type: COMPLIANT,
			message: `Fuiste denunciado por el motivo de ${compliant.reason}. Investigaremos el caso para tomar las medidas necesarias.`,
			contentId: compliant.id,
		}
		notificationService.createNotification(compliantNotificationContent)
	}
}

const login = async (email, password) => {
	return userService.login(email, password)
}

const findUserById = async id => {
	return userService.findUserById(id)
}

const uploadIdentification = async file => {
	const fileName = `${new Date().getTime()}-${file.originalname}`

	const readFile = util.promisify(fs.readFile)

	// read binary data
	const bitmap = await readFile(file.path)
	// convert binary data to base64 encoded string
	let base64File = new Buffer(bitmap).toString('base64')

	const index = base64File.indexOf(';base64,')
	if (index !== -1) {
		base64File = base64File.substring(index + 8)
	}

	const url = await s3Service.uploadFileBase64(base64File, fileName, config.get('aws.S3.buckets.userImagesWeraisen'))

	return url
}

module.exports = {
	signup,
	login,
	findUserById,
	uploadIdentification,
	createCompliant,
}
