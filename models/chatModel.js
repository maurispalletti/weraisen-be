const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  date: Date,
  emisor: String,
  receptor: String,
  text: String,
})

const ChatSchema = new Schema({
  user1: { type: String, required: true },
  user2: { type: String, required: true },
  messages: [MessageSchema]
})

ChatSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

ChatSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('chats', ChatSchema)
