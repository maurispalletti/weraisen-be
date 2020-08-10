const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const constants = require('../commons/constants')
// const bcrypt = require('bcrypt')

const {
  users: {
    gender: { MALE, FEMALE, OTHER },
    status: { PENDING, ACTIVE, DELETED, BLOCKED },

  } } = constants;

const UserSchema = new Schema({
  // for all users, tourists as default
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  identification: { type: String, required: true },
  birthDate: { type: Date },
  gender: {
    type: String,
    enum: [FEMALE, MALE, OTHER],
    required: true,
  },
  status: {
    type: String,
    enum: [PENDING, ACTIVE, DELETED, BLOCKED],
    required: true,
    default: PENDING
  },
  // following info is not mandatory, only for guides
  isActiveGuide: { type: Boolean, required: true, default: false },
  isAdmindAccount: { type: Boolean, required: false, default: false },
  description: String,
  languages: [String],
  knowledge: [String],
  availableDays: [String],
  groupwalk: { type: Boolean, default: false },
  city: String,
  idFront: { type: String, required: true },
  idBack: { type: String, required: true },
  profilePicture: { type: String, required: true },
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
