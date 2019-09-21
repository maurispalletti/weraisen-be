require('dotenv').config()

module.exports = {
  apiConfig: 'default',
  apiPrefix: '/api/v1',
//   mongo: {
//     url: 'mongodb://ec2-52-53-254-96.us-west-1.compute.amazonaws.com:27017/admin',
//     options: {
//       dbName: 'job-nation',
//       socketTimeoutMS: 10000,
//       keepAlive: true,
//       reconnectTries: 30,
//       reconnectInterval: 1000,
//       useNewUrlParser: true
//     }
//   },
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
