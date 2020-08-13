const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')
const userModel = require('../models/userModel')

const createUser = async user => {
  const newUser = new UserModel(user)
  const savedUser = await newUser.save({ new: true })
  if (savedUser) {
    return { id: savedUser.id }

  }
  throw new error.AppError(exceptions.exceptionType.user.cannotCreateUser, 'userService.createUser')

}

const login = async (email, password) => {
  // const user = await UserModel.findOne({ email, password, status: constants.users.status.ACTIVE })
  const user = await UserModel.findOne({ email, password })
  if (user) {
    return user
  }
  return null
  throw new error.AppError(exceptions.exceptionType.user.invalidUserOrPassword, 'userService.login')
}

const findUserById = async id => {
  const user = UserModel.findById(id)
  if (user) {
    return user
  }
  throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userService.findUserById')
}


const updateUserStatus = async (id, status) => {
  return UserModel.findByIdAndUpdate(id, { $set: { status } }, { new: true })
}

const findUsersByStatus = async (status) => {
  return UserModel.find({ status })
}

// const findUserByToken = async token => {
//   logger.info(`findUserByToken - token[${token}]`)
//   return UserModel.findOne({ recoveryToken: token })
// }


const getUsersCreatedPerMonth = async date => {
  let results = [];

  try {

    const queryJanuary = { createdAt: { $gte: new Date(date, 0, 01), $lte: new Date(date, 0, 31) } }
    const january = await UserModel.find(queryJanuary);
    results.push({ category: "Enero", value: january.length })
    // results.push({ january: january.length })

    const queryFebruary = { createdAt: { $gte: new Date(date, 01, 01), $lte: new Date(date, 01, 28) } }
    const february = await UserModel.find(queryFebruary);
    results.push({ category: "Febrero", value: february.length })
    // results.push({ february: february.length })

    const queryMarch = { createdAt: { $gte: new Date(date, 02, 01), $lte: new Date(date, 02, 31) } }
    const march = await UserModel.find(queryMarch);
    results.push({ category: "Marzo", value: march.length })
    // results.push({ march: march.length })

    const queryApril = { createdAt: { $gte: new Date(date, 03, 01), $lte: new Date(date, 03, 30) } }
    const april = await UserModel.find(queryApril);
    results.push({ category: "Abril", value: april.length })
    // results.push({ april: april.length })

    const queryMay = { createdAt: { $gte: new Date(date, 04, 01), $lte: new Date(date, 04, 31) } }
    const may = await UserModel.find(queryMay);
    results.push({ category: "Mayo", value: may.length })
    // results.push({ may: may.length })

    const queryJune = { createdAt: { $gte: new Date(date, 05, 01), $lte: new Date(date, 05, 30) } }
    const june = await UserModel.find(queryJune);
    console.log(june)
    results.push({ category: "Junio", value: june.length })
    // results.push({ june: june.length })

    const queryJuly = { createdAt: { $gte: new Date(date, 06, 01), $lte: new Date(date, 06, 31) } }
    const july = await UserModel.find(queryJuly);
    results.push({ category: "Julio", value: july.length })
    // results.push({ july: july.length })

    const queryAugust = { createdAt: { $gte: new Date(date, 07, 01), $lte: new Date(date, 07, 31) } }
    const august = await UserModel.find(queryAugust);
    results.push({ category: "Agosto", value: august.length })
    // results.push({ august: august.length })

    const querySeptember = { createdAt: { $gte: new Date(date, 08, 01), $lte: new Date(date, 08, 30) } }
    const september = await UserModel.find(querySeptember);
    results.push({ category: "Septiembre", value: september.length })
    // results.push({ september: september.length })

    const queryOctober = { createdAt: { $gte: new Date(date, 09, 01), $lte: new Date(date, 09, 31) } }
    const october = await UserModel.find(queryOctober);
    results.push({ category: "Octubre", value: october.length })
    // results.push({ october: october.length })

    const queryNovember = { createdAt: { $gte: new Date(date, 10, 01), $lte: new Date(date, 10, 30) } }
    const november = await UserModel.find(queryNovember);
    results.push({ category: "Noviembre", value: november.length })
    // results.push({ november: november.length })

    const queryDecember = { createdAt: { $gte: new Date(date, 11, 01), $lte: new Date(date, 11, 31) } }
    const december = await UserModel.find(queryDecember);
    results.push({ category: "Diciembre", value: december.length })
    // results.push({ december: december.length })

    return results;

  } catch (error) {
    throw new error.AppError(exceptions.exceptionType.match.queryFailed, 'userService.getQuantityPerMonth')
  }




}

const getCategoriesPerGender = async () => {

  let results = [];

  const queryFem = ({ gender: "Femenino" })
  const queryMasc = ({ gender: "Masculino" })
  const queryOtro = ({ gender: "Otro" })
  const queryNoche = ({ knowledge: "noche" })
  const queryDeportes = ({ knowledge: "deportes" })
  const queryAventura = ({ knowledge: "aventura" })
  const queryShopping = ({ knowledge: "shopping" })
  const queryCultura = ({ knowledge: "cultura" })
  const queryGastronomia = ({ knowledge: "gastronomia" })
  const queryGuia = ({ isActiveGuide: true })


  const queryFemNoche = { $and: [] }
  queryFemNoche.$and.push(queryFem)
  queryFemNoche.$and.push(queryNoche)
  queryFemNoche.$and.push(queryGuia)
  const femNoche = await userModel.find(queryFemNoche)
  results.push({ category: "Noche", value: femNoche.length })

  const queryMascNoche = { $and: [] }
  queryMascNoche.$and.push(queryMasc)
  queryMascNoche.$and.push(queryNoche)
  queryMascNoche.$and.push(queryGuia)
  const mascNoche = await UserModel.find(queryMascNoche)
  results.push({ category: "Noche", value: mascNoche.length })

  const queryOtroNoche = { $and: [] }
  queryOtroNoche.$and.push(queryOtro)
  queryOtroNoche.$and.push(queryNoche)
  queryOtroNoche.$and.push(queryGuia)
  const otroNoche = await UserModel.find(queryOtroNoche)
  results.push({ category: "Noche", value: otroNoche.length })

  const queryFemDeportes = { $and: [] }
  queryFemDeportes.$and.push(queryFem)
  queryFemDeportes.$and.push(queryDeportes)
  queryFemDeportes.$and.push(queryGuia)
  const femDeportes = await userModel.find(queryFemDeportes)
  results.push({ category: "Deportes", value: femDeportes.length })

  const queryMascDeportes = { $and: [] }
  queryMascDeportes.$and.push(queryMasc)
  queryMascDeportes.$and.push(queryDeportes)
  queryMascDeportes.$and.push(queryGuia)
  const mascDeportes = await UserModel.find(queryMascDeportes)
  results.push({ category: "Deportes", value: mascDeportes.length })

  const queryOtroDeportes = { $and: [] }
  queryOtroDeportes.$and.push(queryOtro)
  queryOtroDeportes.$and.push(queryDeportes)
  queryOtroDeportes.$and.push(queryGuia)
  const otroDeportes = await UserModel.find(queryOtroDeportes)
  results.push({ category: "Deportes", value: otroDeportes.length })

  const queryFemAventura = { $and: [] }
  queryFemAventura.$and.push(queryFem)
  queryFemAventura.$and.push(queryAventura)
  queryFemAventura.$and.push(queryGuia)
  const femAventura = await userModel.find(queryFemAventura)
  results.push({ category: "Aventura", value: femAventura.length })

  const queryMascAventura = { $and: [] }
  queryMascAventura.$and.push(queryMasc)
  queryMascAventura.$and.push(queryAventura)
  queryMascAventura.$and.push(queryGuia)
  const mascAventura = await userModel.find(queryMascAventura)
  results.push({ category: "Aventura", value: mascAventura.length })

  const queryOtroAventura = { $and: [] }
  queryOtroAventura.$and.push(queryOtro)
  queryOtroAventura.$and.push(queryAventura)
  queryOtroAventura.$and.push(queryGuia)
  const otroAventura = await userModel.find(queryOtroAventura)
  results.push({ category: "Aventura", value: otroAventura.length })

  const queryFemShopping = { $and: [] }
  queryFemShopping.$and.push(queryFem)
  queryFemShopping.$and.push(queryShopping)
  queryFemShopping.$and.push(queryGuia)
  const femShopping = await userModel.find(queryFemShopping)
  results.push({ category: "Shopping", value: femShopping.length })

  const queryMascShopping = { $and: [] }
  queryMascShopping.$and.push(queryMasc)
  queryMascShopping.$and.push(queryShopping)
  queryMascShopping.$and.push(queryGuia)
  const mascShopping = await userModel.find(queryMascShopping)
  results.push({ category: "Shopping", value: mascShopping.length })

  const queryOtroShopping = { $and: [] }
  queryOtroShopping.$and.push(queryOtro)
  queryOtroShopping.$and.push(queryShopping)
  queryOtroShopping.$and.push(queryGuia)
  const otroShopping = await userModel.find(queryOtroShopping)
  results.push({ category: "Shopping", value: otroShopping.length })

  const queryfemCultura = { $and: [] }
  queryfemCultura.$and.push(queryFem)
  queryfemCultura.$and.push(queryCultura)
  queryfemCultura.$and.push(queryGuia)
  const femCultura = await userModel.find(queryfemCultura)
  results.push({ category: "Cultura", value: femCultura.length })

  const querymascCultura = { $and: [] }
  querymascCultura.$and.push(queryMasc)
  querymascCultura.$and.push(queryCultura)
  querymascCultura.$and.push(queryGuia)
  const mascCultura = await userModel.find(querymascCultura)
  results.push({ category: "Cultura", value: mascCultura.length })

  const queryotroCultura = { $and: [] }
  queryotroCultura.$and.push(queryOtro)
  queryotroCultura.$and.push(queryCultura)
  queryotroCultura.$and.push(queryGuia)
  const otroCultura = await userModel.find(queryotroCultura)
  results.push({ category: "Cultura", value: otroCultura.length })

  const queryfemGastronomia = { $and: [] }
  queryfemGastronomia.$and.push(queryFem)
  queryfemGastronomia.$and.push(queryGastronomia)
  queryfemGastronomia.$and.push(queryGuia)
  const femGastronomia = await userModel.find(queryfemGastronomia)
  results.push({ category: "Gastronomia", value: femGastronomia.length })

  const querymascGastronomia = { $and: [] }
  querymascGastronomia.$and.push(queryMasc)
  querymascGastronomia.$and.push(queryGastronomia)
  querymascGastronomia.$and.push(queryGuia)
  const mascGastronomia = await userModel.find(querymascGastronomia)
  results.push({ category: "Gastronomia", value: mascGastronomia.length })

  const queryotroGastronomia = { $and: [] }
  queryotroGastronomia.$and.push(queryOtro)
  queryotroGastronomia.$and.push(queryGastronomia)
  queryotroGastronomia.$and.push(queryGuia)
  const otroGastronomia = await userModel.find(queryotroGastronomia)
  results.push({ category: "Gastronomia", value: otroGastronomia.length })


  return results;



}
module.exports = {
  createUser,
  login,
  findUserById,
  findUsersByStatus,
  updateUserStatus,
  getUsersCreatedPerMonth,
  getCategoriesPerGender,
}
