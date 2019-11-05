const reviewDelegate = require('../delegates/reviewDelegate')
const validators = require('../commons/validators')

const postReview = async (req, res) => {
  const requiredParams = [
    'giver',
    'owner',
    'matchId',
    'points',
    'description',
  ]

  validators.validateRequiredKeys(req.body, requiredParams)

  const review = req.body

  const newReview = await reviewDelegate.postReview(review)
  res.json(newReview)
}


const getReviewsByUser = async (req, res) => {
  validators.validateRequiredKeys(req.params, ['userId'])

  const { userId } = req.params

  const reviews = await reviewDelegate.getReviewsByUser(userId)

  res.json(reviews)
}


module.exports = {
  postReview,
  getReviewsByUser,
}
