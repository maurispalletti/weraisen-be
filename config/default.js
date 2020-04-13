require('dotenv').config()

module.exports = {
  apiConfig: 'default',
  apiPrefix: '/api/v1',
  mongo: {
    url: 'mongodb+srv://spallettimauricio:7a016B22%2F@weraisen-test-mjlak.mongodb.net/test',
    // url: 'mongodb://127.0.0.1:27017',
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
  aws: {
    S3: {
      accessKeyId: 'AKIAJS3PPDF7HG7ZJPTA',
      secretAccessKey: process.env.S3_SECRET_KEY_ENV,
      region: 'us-west-2',
      apiVersion: '2006-03-01',
      buckets: {
        userImagesWeraisen: 'user-images-weraisen'
      }
    },
  },
  domain: 'http://localhost:3001',
}
