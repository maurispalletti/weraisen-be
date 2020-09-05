const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')
const userModel = require('../models/userModel')
const { query } = require('express')

const createUser = async user => {
  const { email } = user;
  const userAlreadyCreated = await UserModel.findOne({ email })
  if (userAlreadyCreated) {
    return { repeatedEmail: true }
  } else {
    const newUser = new UserModel(user)
    const savedUser = await newUser.save({ new: true })
    if (savedUser) {
      return { id: savedUser.id }
    }
    throw new error.AppError(exceptions.exceptionType.user.cannotCreateUser, 'userService.createUser')

  }
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

const updatePassword = async (userId, password) => {
  const user = await UserModel.findByIdAndUpdate(userId, { $set: { password } }, { new: true })
  if (user) {
    return user
  }
  throw new error.AppError(exceptions.exceptionType.user.invalidUserOrPassword, 'userService.updatePassword')
}

const findUserById = async id => {
  const user = UserModel.findById(id)
  if (user) {
    return user
  }
  throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userService.findUserById')
}

const findUserByEmail = async email => {
  const userId = UserModel.findOne({ email })
  if (userId) {
    return userId
  }
  throw new error.AppError(exceptions.exceptionType.user.userNotFound, 'userService.findUserByEmail')
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

const getUsersCreatedPerMonth = async () => {
  let results = [];

  /* const usuarios = await userModel.find({createdAt: {$exists: true}})
   results.push({usuarios})
 */
  const date = 2020;


  const queryJanuary = { createdAt: { $gte: new Date(date, 0, 01), $lte: new Date(date, 0, 31) } }
  const january = await UserModel.find(queryJanuary);
  if (january.length > 0) {
    results.push({ category: "Enero", value: january.length })
  }
  // results.push({ january: january.length })

  const queryFebruary = { createdAt: { $gte: new Date(date, 01, 01), $lte: new Date(date, 01, 28) } }
  const february = await UserModel.find(queryFebruary);
  if (february.length > 0) {
    results.push({ category: "Febrero", value: february.length })
  }
  // results.push({ february: february.length })

  const queryMarch = { createdAt: { $gte: new Date(date, 02, 01), $lte: new Date(date, 02, 31) } }
  const march = await UserModel.find(queryMarch);
  if (march.length > 0) {
    results.push({ category: "Marzo", value: march.length })
  }
  // results.push({ march: march.length })

  const queryApril = { createdAt: { $gte: new Date(date, 03, 01), $lte: new Date(date, 03, 30) } }
  const april = await UserModel.find(queryApril);
  if (april.length > 0) {
    results.push({ category: "Abril", value: april.length })
  }
  // results.push({ april: april.length })

  const queryMay = { createdAt: { $gte: new Date(date, 04, 01), $lte: new Date(date, 04, 31) } }
  const may = await UserModel.find(queryMay);
  if (may.length > 0) {
    results.push({ category: "Mayo", value: may.length })
  }
  // results.push({ may: may.length })

  const queryJune = { createdAt: { $gte: new Date(date, 05, 01), $lte: new Date(date, 05, 30) } }
  const june = await UserModel.find(queryJune);
  if (june.length > 0) {
    results.push({ category: "Junio", value: june.length })
  }
  // results.push({ june: june.length })

  const queryJuly = { createdAt: { $gte: new Date(date, 06, 01), $lte: new Date(date, 06, 31) } }
  const july = await UserModel.find(queryJuly);
  if (july.length > 0) {
    results.push({ category: "Julio", value: july.length })
  }
  // results.push({ july: july.length })

  const queryAugust = { createdAt: { $gte: new Date(date, 07, 01), $lte: new Date(date, 07, 31) } }
  const august = await UserModel.find(queryAugust);
  if (august.length > 0) {
    results.push({ category: "Agosto", value: august.length })
  }
  // results.push({ august: august.length })

  const querySeptember = { createdAt: { $gte: new Date(date, 08, 01), $lte: new Date(date, 08, 30) } }
  const september = await UserModel.find(querySeptember);
  if (september.length > 0) {
    results.push({ category: "Septiembre", value: september.length })
  }
  // results.push({ september: september.length })

  const queryOctober = { createdAt: { $gte: new Date(date, 09, 01), $lte: new Date(date, 09, 31) } }
  const october = await UserModel.find(queryOctober);
  if (october.length > 0) {
    results.push({ category: "Octubre", value: october.length })
  }
  // results.push({ october: october.length })

  const queryNovember = { createdAt: { $gte: new Date(date, 10, 01), $lte: new Date(date, 10, 30) } }
  const november = await UserModel.find(queryNovember);
  if (november.length > 0) {
    results.push({ category: "Noviembre", value: november.length })
  }
  // results.push({ november: november.length })

  const queryDecember = { createdAt: { $gte: new Date(date, 11, 01), $lte: new Date(date, 11, 31) } }
  const december = await UserModel.find(queryDecember);
  if (december.length > 0) {
    results.push({ category: "Diciembre", value: december.length })
  }
  // results.push({ december: december.length })



  return results;


}

const getCategoriesMostSelected = async () => {
  let results = [];

  const aventura = await userModel.find(queryAventura)
  results.push({ category: "Aventura", value: aventura.length })
  const deportes = await userModel.find(queryDeportes)
  results.push({ category: "Deportes", value: deportes.length })
  const noche = await userModel.find(queryNoche)
  results.push({ category: "Noche", value: noche.length })
  const shopping = await userModel.find(queryShopping)
  results.push({ category: "Shopping", value: shopping.length })
  const gastronomia = await userModel.find(queryGastronomia)
  results.push({ category: "Gastronomía", value: gastronomia.length })
  const cultura = await userModel.find(queryCultura)
  results.push({ category: "Cultura", value: cultura.length })


  return results;

}

const getCategoriesPerGender = async () => {

  let results = [];

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

const getUsersPerAge = async () => {
  let results = [];

  let hoy = new Date();
  let año = hoy.getFullYear();
  let año18 = año - 18;

  const query1 = { birthDate: { $gte: new Date(año18 - 7, 0, 01), $lte: new Date(año18, 11, 31) } }
  const query2 = { birthDate: { $gte: new Date(año18 - 14, 0, 01), $lte: new Date(año18 - 8, 11, 31) } }
  const query3 = { birthDate: { $gte: new Date(año18 - 21, 0, 01), $lte: new Date(año18 - 15, 11, 31) } }
  const query4 = { birthDate: { $gte: new Date(año18 - 28, 0, 01), $lte: new Date(año18 - 22, 11, 31) } }
  const query5 = { birthDate: { $lte: new Date(año18 - 29, 11, 31) } }

  const rango1 = await userModel.find(query1)
  results.push({ label: "18-24", value: rango1.length, color: "#F9AA68" })
  const rango2 = await userModel.find(query2)
  results.push({ label: "25-35", value: rango2.length, color: "#9CD6AE" })
  const rango3 = await userModel.find(query3)
  results.push({ label: "36-45", value: rango3.length, color: "#EA4E41" })
  const rango4 = await userModel.find(query4)
  results.push({ label: "46-56", value: rango4.length, color: "883128" })
  const rango5 = await userModel.find(query5)
  results.push({ label: "57 o más", value: rango5.length, color: "F7913C" })

  return results;
}

const getUsersPerLanguages = async () => {

  let languages = ["Español", "Inglés", "Portugués", "Italiano", "Alemán", "Francés"];
  let results = [];
  for (let index = 0; index < languages.length; index++) {
    const language = languages[index];
    const queryLanguage = ({ languages: language })

    const resultadoLanguages = await userModel.find(queryLanguage);
    results.push({ category: language, value: resultadoLanguages.length })
  }
  return results;
}

const getUsersPerGender = async () => {
  let results = [];
  const femeninos = await userModel.find(queryFem)
  results.push({ label: "Femenino", value: femeninos.length, color: "#9CD6AE" })
  const masculinos = await userModel.find(queryMasc)
  results.push({ label: "Masculino", value: masculinos.length, color: "#F9AA68" })
  const otros = await userModel.find(queryOtro)
  results.push({ label: "Otro", value: otros.length, color: "#EA4E41" })

  return results;
}

const getCategoriesPerCity = async () => {
  /*let ciudades = ["Buenos Aires", "Bariloche", "Comodoro Rivadavia", "Cordoba", "Corrientes", "Cosquin", "El Bolson", "El Chalten", "Esquel", "Formosa", "General Pico",
    "Gualeguaychu", "Humauaca", "La Cumbrecita", "LaPlata", "La Rioja", "Mardel", "Mendoza", "Merlo", "Neuquen", "Mina Clavero", "Monte Hermoso", "Parana", "Perito Moreno",
    "Pinamar", "Posadas", "Puerto Iguazu", "Puerto Madryn", "Resistencia", "Rio Gallegos", "Rio Grande", "Rosario", "Salta", "San Fernando del Valle de Catamarca", "San Juan", "San Luis", "San Martin de los Andes",
    "San Miguel de Tucuman", "San Rafael", "San Salvador de Jujuy", "Santa Fe", "Santa Rosa", "Santiago Del Estero", "Termas de Rio Hondo", "Tilcara", "Trelew", "Ushuaia", "Villa Carlos Paz",
    "Villa Maria",];*/
  let ciudades = ["Buenos Aires", "Cordoba", "LaPlata", "Mar del Plata", "Neuquen", "Mendoza", "Rosario"];

  let categorias = ["aventura", "deportes", "noche", "shopping", "gastronomia", "cultura"];


  let results = [];

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];

    const queryCategoria = ({ knowledge: categoria })

    let resultsS = [];

    for (let index = 0; index < ciudades.length; index++) {
      const queryAmbos = { $and: [] }
      queryAmbos.$and.push(queryCategoria)
      const ciudad = ciudades[index];
      const queryCiudad = ({ city: ciudad })
      queryAmbos.$and.push(queryCiudad)
      let resultsCiudades = [];

      resultsCiudades = await userModel.find(queryAmbos)
      // if (resultsCiudades.length > 0) {

      resultsS.push({ seriename: ciudad, value: resultsCiudades.length })
      //}
    }
    results.push({ label: categoria, resultsS })
  }

  return results
}

module.exports = {
  createUser,
  login,
  findUserById,
  findUsersByStatus,
  updateUserStatus,
  getUsersCreatedPerMonth,
  getCategoriesPerGender,
  getCategoriesMostSelected,
  getUsersPerAge,
  getUsersPerLanguages,
  getUsersPerGender,
  getCategoriesPerCity,
  findUserByEmail,
  updatePassword,
}
