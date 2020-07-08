const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const constants = require('../commons/constants')

const {
  notifications: {
    status: { ACTIVE, CLOSED },
    type: { REVIEW, ADVICE, ELECTED, APROVED, REJECTED },
  } } = constants;

const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  status: {
    type: String,
    enum: [ACTIVE, CLOSED],
    required: true,
    default: ACTIVE
  },
  type: {
    type: String,
    enum: [REVIEW, ADVICE, ELECTED, APROVED, REJECTED],
    required: true
  },
  message: { type: String, required: true },
  contentId: { type: String, required: true },
})

NotificationSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

NotificationSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('notifications', NotificationSchema)
