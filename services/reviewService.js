const ReviewModel = require('../models/reviewModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')


const postReview = async (review) => {
  const newReview = new ReviewModel(review)

  const savedReview = await newReview.save({ new: true })

  if (savedReview) {
    return savedReview
  }
  throw new error.AppError(exceptions.exceptionType.review.cannotCreateReview, 'reviewService.createReview')
}

const getReviewsByUser = async userId => {
  const reviews = await ReviewModel.find({ owner: userId })

  if (reviews) {
    return reviews
  }
  return []
}

module.exports = {
  postReview,
  getReviewsByUser,
}
