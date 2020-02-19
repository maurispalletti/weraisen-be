const util = require('util')
const fs = require('fs')
const config = require('config')

const userService = require('../services/userService')
const s3Service = require('../services/s3Service')

// PUBLIC FUNCTIONS //////////////////////////////////////////////////

const signup = newUser => {
	return userService.createUser(newUser)
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
	uploadIdentification
}
