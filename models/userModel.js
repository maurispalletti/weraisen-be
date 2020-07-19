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

  const getAge = async (birthDate)=>{

    let hoy = new Date()
    let fechaNacimiento = new Date(birthDate)
    let age = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      age--
    }
    return age
  }
const UserSchema = new Schema({
  // for all users, tourists as default
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  identification: { type: String, required: true, unique: true },
  birthDate: { type: Date},
  
  gender: {
    type: String,
    enum: [FEMALE, MALE, OTHER],
    required: true,
  },
  status: {
    type: String,
    enum: [PENDING, ACTIVE, DELETED, BLOCKED],
    required: true,
    default: ACTIVE
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
