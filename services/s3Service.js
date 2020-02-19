const config = require('config')
const AWS = require('aws-sdk')
const fs = require('fs')
const util = require('util')
const error = require('../commons/error')
const exceptions = require('../commons/exceptions')

const s3 = new AWS.S3({
  accessKeyId: config.get('aws.S3.accessKeyId'),
  secretAccessKey: config.get('aws.S3.secretAccessKey'),
  region: config.get('aws.S3.region'),
  apiVersion: config.get('aws.S3.apiVersion')
})

const putObject = util.promisify(s3.putObject.bind(s3))

const uploadFile = (file, key, bucket) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function (err, data) {
      if (err) return reject(err) // an error occurred

      let base64data = new Buffer(data, 'binary')

      s3.putObject(
        {
          Bucket: bucket,
          Key: key,
          Body: base64data
        },
        function (err) {
          if (err) return reject(err) // an error occurred
          return resolve({ url: buildAWSUrl(bucket, key) })
        }
      )
    })
  })
}

const uploadFileBase64 = async (base64data, key, bucket) => {
  // logger.info(`uploadFileBase64 - key[${key}] - bucket[${bucket}]`)
  const cleanedBase64 = base64data.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.alloc(cleanedBase64.length, cleanedBase64, 'base64')
  const config = {
    Bucket: bucket,
    Key: key,
    Body: buf,
    ContentEncoding: 'base64'
  }
  if (base64data.search('data:image') > -1) {
    config.ContentType = 'image/jpeg'
  } else if (key.indexOf('.pdf') > -1) {
    config.ContentType = 'application/pdf'
  } else if (key.indexOf('.doc') > -1 || key.indexOf('.docx') > -1) {
    config.ContentDisposition = `attachment; filename="${key}"`
  }
  try {
    await putObject(config)
    return buildAWSUrl(bucket, key)
  } catch (e) {
    // logger.error(e)
    throw new error.AppError(exceptions.exceptionType.services.amazonS3Error, e)
  }
}

const buildAWSUrl = (bucket, key) => {
  return 'https://s3-' + config.get('aws.S3.region') + '.amazonaws.com/' + bucket + '/' + key
}

module.exports = {
  uploadFile,
  uploadFileBase64
}
