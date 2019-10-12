const languageModel = require('../models/languageModel')

const getLanguages = async () => {

     
    return languageModel.find()
  }

const createLanguage = async (language) => {
  
    const newLanguage = new languageModel(language)
    const savedLanguage = newLanguage.save({ new: true })
    
    if (savedLanguage) {
     return getLanguages()
    }
     return null

    
    }
   



module.exports = {
    
    getLanguages,
    createLanguage,
  }