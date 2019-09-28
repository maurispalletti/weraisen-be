require('dotenv').config()

module.exports = {
  apiConfig: 'default',
  apiPrefix: '/api/v1',
  mongo: {
    // url: 'mongodb+srv://spallettimauricio:7a016B22%2F@weraisen-test-mjlak.mongodb.net/test',
    url: 'mongodb://127.0.0.1:27017',
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
//   aws: {
//     S3: {
//       accessKeyId: 'AKIAIYCJDSNVINT54HPQ',
//       secretAccessKey: process.env.S3_SECRET_KEY_ENV,
//       region: 'us-west-1',
//       apiVersion: '2006-03-01',
//       buckets: {
//         rchilli: 'jn-dev-cvs'
//       }
//     },
//   },
  domain: 'http://localhost:3001',
}
