const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose')
const config = require('config')
const apiPrefix = config.get('apiPrefix')
const cors = require('cors');
const passportConfig = require('./config/server/passportConfig')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// pass passport for configuration
passport.use(passportConfig.createStrategy())
app.use(passport.initialize())

app.use(apiPrefix, (req, res, next) => {
  if (req.url === '/admin/createToken') {
    next()
  } else {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        res.status(401).json({ code: 5101, message: 'Invalid token' })
      }
      return next()
    })(req, res, next)
  }
})

// ROUTES
app.use(apiPrefix + '/users', require('./routes/userRoute'))
app.use(apiPrefix + '/tourists', require('./routes/touristRoute'))
app.use(apiPrefix + '/guides', require('./routes/guideRoute'))
app.use(apiPrefix + '/chat', require('./routes/chatRoute'))
app.use(apiPrefix + '/matches', require('./routes/matchRoute'))
app.use(apiPrefix + '/reviews', require('./routes/reviewRoute'))
app.use(apiPrefix + '/charts', require('./routes/chartRoute'))
app.use(apiPrefix + '/requests', require('./routes/requestRoute'))
app.use(apiPrefix + '/notifications', require('./routes/notificationRoute'))
app.use(apiPrefix + '/admin', require('./routes/adminRoute'))

/* GET home page. */
app.get('/', (req, res) => {
  res.json("API Dashboard back-end is up in '" + config.get('apiConfig') + "' mode.")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

const initializeBackingServices = async () => {
  mongoose.Promise = global.Promise
  try {
    await Promise.all([
      mongoose.connect(config.get('mongo.url'), config.get('mongo.options')),
    ])
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ [ Connected to MongoDB ] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ [ Listening on port ${process.env.PORT} ] ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  } catch (error) {
    console.log(`An error occur during Initialize Backing Services. Detail: ${error}`)
    process.exit()
  }
}
initializeBackingServices()
module.exports = app;
