require('dotenv').config()

module.exports = {
  apiConfig: 'default',
  apiPrefix: '/api/v1',
  mongo: {
    // url: 'mongodb+srv://spallettimauricio:7a016B22%2F@weraisen-test-mjlak.mongodb.net/test',
    url: process.env.MONGO_URI,
    options: {
      dbName: 'weraisen-test',
      socketTimeoutMS: 30000,
      keepAlive: true,
      reconnectTries: 40,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
  aws: {
    S3: {
      accessKeyId: 'AKIAZDZG5OW5HQ6K33WZ',
      secretAccessKey: process.env.S3_SECRET_KEY_ENV,
      region: 'sa-east-1',
      apiVersion: '2006-03-01',
      buckets: {
        userImagesWeraisen: 'weraisen-images'
      }
    },
  },
  domain: 'http://localhost:3001',
}
