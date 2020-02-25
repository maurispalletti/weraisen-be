const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const constants = require('../commons/constants')

const {
  requests: {
    status: { CREATED, CONFIRMED, CANCELED },
  } } = constants;

const RequestSchema = new Schema({
  userId: { type: String, required: true },
  requestedId: { type: String, required: true },
  status: {
    type: String,
    enum: [CREATED, CONFIRMED, CANCELED],
    required: true,
    default: CREATED
  },
})

RequestSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

RequestSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('requests', RequestSchema)
