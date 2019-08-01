const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const mongoose = require('mongoose')
const config = require('config')
const passport = require('passport')
const logger = require('./config/server/logger')
const { AppError } = require('./commons/error')
const exceptions = require('./commons/exceptions')

process.title = 'third-love-api'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Pass Passport configuration
require('./config/server/passportConfig')(passport)
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './commons/src/doc.html'))
})

// To validate protected with authentication
app.use('/', (req, res, next) => {
  if (req.url.endsWith('/checkout')) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        res.status(401).json({ code: 2300, message: 'Invalid token' })
        throw new AppError(exceptions.exceptionType.token.invalidToken)
      }
      req.user = user
      return next()
    })(req, res, next)
  } else {
    next()
  }
})

app.use('/carts', require('./routes/cartRoute'))
app.use('/orders', require('./routes/orderRoute'))
app.use('/', require('./routes/userRoute'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

const initializeBackingServices = async () => {
  mongoose.Promise = global.Promise
  try {
    await mongoose.connect(config.get('mongo.url'), config.get('mongo.options'))
    logger.info('Connected to MongoDB')
    logger.info(`Application started in ${config.get('apiConfig')} mode`)
  } catch (error) {
    logger.error(`An error occur during Initialize Backing Services. Detail: ${error}`)
    process.exit()
  }
}
initializeBackingServices()

module.exports = app

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
