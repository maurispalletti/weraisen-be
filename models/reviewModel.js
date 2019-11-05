const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  giver: { type: String, required: true },
  owner: { type: String, required: true },
  matchId: { type: String, required: true },
  points: { type: Number, required: true }, 
  description: { type: String, required: true }, 
})

ReviewSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

ReviewSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('reviews', ReviewSchema)
