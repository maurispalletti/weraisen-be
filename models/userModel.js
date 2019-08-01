const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

UserSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

UserSchema.options.toJSON = {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

UserSchema.pre('save', function (next) {
  const user = this
  // only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    try {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt)
      next()
    } catch (error) {
      return next(error)
    }
  }
  next()
})

UserSchema.methods.comparePassword = (userPassword, hashedPassword) => {
  return bcrypt.compare(userPassword, hashedPassword)
}

module.exports = mongoose.model('users', UserSchema)
// TODO: Check model name in mongo de Chana
