const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const constants = require('../commons/constants')
// const bcrypt = require('bcrypt')

const { users: {
  gender: { MALE, FEMALE, OTHER },
  status: { PENDING, ACTIVE, DELETED },
} } = constants;

const UserSchema = new Schema({
  // for all users, tourists as default
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fistName: { type: String, required: true },
  lastName: { type: String, required: true },
  identification: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  gender: {
    type: String,
    enum: [FEMALE, MALE, OTHER],
    required: true,
  },
  status: {
    type: String,
    enum: [PENDING, ACTIVE, DELETED],
    required: true,
    default: ACTIVE
  },
  // following info is not mandatory, only for guides
  isActiveGuide: { type: Boolean, required: true, default: false },
  description: String,
  languages: [String],
  knowledge: [String]
})

UserSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

UserSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('users', UserSchema)
