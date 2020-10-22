'use strict'

const config = require('config')
const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const createStrategy = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('auth.secret'),
    passReqToCallback: true
  }
  const strategy = new JwtStrategy(jwtOptions, (req, jwtPayload, next) => {
    next(null, {})
  })
  return strategy
}

module.exports = {
  createStrategy
}
