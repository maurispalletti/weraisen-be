const languageDelegate = require('../delegates/languageDelegate')


const getLanguages = async (req, res) => {
    
    const languages = await languageDelegate.getLanguages()
    res.json(languages)
  }

const postLanguage = async (req, res) => {
    
  const newLanguage = req.body

  const languages = await languageDelegate.postLanguage(newLanguage)
  res.json(languages)

  }

  module.exports = {
    getLanguages,
    postLanguage,
  }