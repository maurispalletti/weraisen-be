const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const constants = require('../commons/constants')

const {
  compliants: {
    status: { CREATED, BLOCKED, RESOLVED },
    reason: { SEXUAL, VIOLENCE, DISCRIMINATION, PUNTUALITY, FAKE, THREAT },
  } } = constants;

const CompliantSchema = new Schema({
  userId: { type: String, required: true },
  accusedId: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: [CREATED, BLOCKED, RESOLVED],
    required: true,
    default: CREATED
  },
  reason: {
    type: String,
    enum: [SEXUAL, VIOLENCE, DISCRIMINATION, PUNTUALITY, FAKE, THREAT],
    required: true,
    default: VIOLENCE
  },
})

CompliantSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

CompliantSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('compliants', CompliantSchema)
