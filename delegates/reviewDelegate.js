const reviewService = require('../services/reviewService')

const postReview = async (review) => {
  return reviewService.postReview(review)
}

const getReviewsByUser = async userId => {
  return reviewService.getReviewsByUser(userId)
}

module.exports = {
  postReview,
  getReviewsByUser
}
