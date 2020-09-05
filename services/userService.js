const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')
const userModel = require('../models/userModel')
const { query } = require('express')

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
const queryTuristas = ({ isActiveGuide: false })

const getUsersCreatedPerMonth = async () => {
  let results = [];
  //const date = 2020;
  const años=[2019,2020,2021];

  

for (let index = 0; index < años.length; index++) {
  const date = años[index];

  const queryJanuary = { createdAt: { $gte: new Date(date, 0, 01), $lte: new Date(date, 0, 31) } }
  const queryJune = { createdAt: { $gte: new Date(date, 05, 01), $lte: new Date(date, 05, 30) } }
  const queryFebruary = { createdAt: { $gte: new Date(date, 01, 01), $lte: new Date(date, 01, 28) } }
  const queryMarch = { createdAt: { $gte: new Date(date, 02, 01), $lte: new Date(date, 02, 31) } }
  const queryApril = { createdAt: { $gte: new Date(date, 03, 01), $lte: new Date(date, 03, 30) } }
  const queryMay = { createdAt: { $gte: new Date(date, 04, 01), $lte: new Date(date, 04, 31) } }
  const queryJuly = { createdAt: { $gte: new Date(date, 06, 01), $lte: new Date(date, 06, 31) } }
  const queryAugust = { createdAt: { $gte: new Date(date, 07, 01), $lte: new Date(date, 07, 31) } }
  const querySeptember = { createdAt: { $gte: new Date(date, 08, 01), $lte: new Date(date, 08, 30) } }
  const queryOctober = { createdAt: { $gte: new Date(date, 09, 01), $lte: new Date(date, 09, 31) } }
  const queryNovember = { createdAt: { $gte: new Date(date, 10, 01), $lte: new Date(date, 10, 30) } }
  const queryDecember = { createdAt: { $gte: new Date(date, 11, 01), $lte: new Date(date, 11, 31) } }


  const queryEneroTuristas = { $and: [] }
  queryEneroTuristas.$and.push(queryJanuary)
  queryEneroTuristas.$and.push(queryTuristas)
  const januaryT = await UserModel.find(queryEneroTuristas);
  if (januaryT.length > 0) {
  results.push({ category: "Enero", value: januaryT.length, year:date, guide:false })}

  const queryEneroGuias = { $and: [] }
  queryEneroGuias.$and.push(queryJanuary)
  queryEneroGuias.$and.push(queryGuia)
  const januaryG = await UserModel.find(queryEneroGuias);
  if (januaryG.length > 0) {
  results.push({ category: "Enero", value: januaryG.length , year:date, guide:true})}

  const queryFebreroTuristas = { $and: [] }
  queryFebreroTuristas.$and.push(queryFebruary)
  queryFebreroTuristas.$and.push(queryTuristas)
  const februaryT = await UserModel.find(queryFebreroTuristas);
  if (februaryT.length > 0) {
  results.push({ category: "Febrero", value: februaryT.length, year:date, guide:false  })}

  const queryFebreroGuias = { $and: [] }
  queryFebreroGuias.$and.push(queryFebruary)
  queryFebreroGuias.$and.push(queryGuia)
  const februaryG = await UserModel.find(queryFebreroGuias);
  if (februaryG.length > 0) {
  results.push({ category: "Febrero", value: februaryG.length, year:date  , guide:true})}


  const queryMarzoTuristas = { $and: [] }
  queryMarzoTuristas.$and.push(queryMarch)
  queryMarzoTuristas.$and.push(queryTuristas)
  const marchT = await UserModel.find(queryMarzoTuristas);
  if (marchT.length > 0) {
  results.push({ category: "Marzo", value: marchT.length , year:date, guide:false})}

  const queryMarzoGuias = { $and: [] }
  queryMarzoGuias.$and.push(queryMarch)
  queryMarzoGuias.$and.push(queryGuia)
  const marchG = await UserModel.find(queryMarzoGuias);
  if (marchG.length > 0) {
  results.push({ category: "Marzo", value: marchG.length, year:date , guide:true })}



  const queryAbrilTuristas = { $and: [] }
  queryAbrilTuristas.$and.push(queryApril)
  queryAbrilTuristas.$and.push(queryTuristas)
  const aprilT = await UserModel.find(queryAbrilTuristas);
  if (aprilT.length > 0) {
  results.push({ category: "Abril", value: aprilT.length , year:date, guide:false})}

  const queryAbrilGuias = { $and: [] }
  queryAbrilGuias.$and.push(queryApril)
  queryAbrilGuias.$and.push(queryGuia)
  const aprilG = await UserModel.find(queryAbrilGuias);
  if (aprilG.length > 0) {
  results.push({ category: "Abril", value: aprilG.length , year:date, guide:true })}


  const queryMayoTuristas = { $and: [] }
  queryMayoTuristas.$and.push(queryMay)
  queryMayoTuristas.$and.push(queryTuristas)
  const mayT = await UserModel.find(queryMayoTuristas);
  if (mayT.length > 0) {
  results.push({ category: "Mayo", value: mayT.length, year:date, guide:false })}

  const queryMayoGuias = { $and: [] }
  queryMayoGuias.$and.push(queryMay)
  queryMayoGuias.$and.push(queryGuia)
  const mayG = await UserModel.find(queryMayoGuias);
  if (mayG.length > 0) {
  results.push({ category: "Mayo", value: mayG.length, year:date, guide:true  })}


  const queryJunioTuristas = { $and: [] }
  queryJunioTuristas.$and.push(queryJune)
  queryJunioTuristas.$and.push(queryTuristas)
  const juneT = await UserModel.find(queryJunioTuristas);
  if (juneT.length > 0) {
  results.push({ category: "Junio", value: juneT.length , year:date, guide:false})}

  const queryJunioGuias = { $and: [] }
  queryJunioGuias.$and.push(queryJune)
  queryJunioGuias.$and.push(queryGuia)
  const juneG = await UserModel.find(queryJunioGuias);
  if (juneG.length > 0) {
  results.push({ category: "Junio", value: juneG.length, year:date, guide:true  })}


  const queryJulioTuristas = { $and: [] }
  queryJulioTuristas.$and.push(queryJuly)
  queryJulioTuristas.$and.push(queryTuristas)
  const julyT = await UserModel.find(queryJulioTuristas);
  if (julyT.length > 0) {
  results.push({ category: "Julio", value: julyT.length , year:date, guide:false})}

  const queryJulioGuias = { $and: [] }
  queryJulioGuias.$and.push(queryJuly)
  queryJulioGuias.$and.push(queryGuia)
  const julyG = await UserModel.find(queryJulioGuias);
  if (julyG.length > 0) {
  results.push({ category: "Julio", value: julyG.length, year:date, guide:true  })}


  const queryAgostoTuristas = { $and: [] }
  queryAgostoTuristas.$and.push(queryAugust)
  queryAgostoTuristas.$and.push(queryTuristas)
  const augustT = await UserModel.find(queryAgostoTuristas);
  if (augustT.length > 0) {
  results.push({ category: "Agosto", value: augustT.length , year:date, guide:false})}

  const queryAgostoGuias = { $and: [] }
  queryAgostoGuias.$and.push(queryAugust)
  queryAgostoGuias.$and.push(queryGuia)
  const augustG = await UserModel.find(queryAgostoGuias);
  if (augustG.length > 0) {
  results.push({ category: "Agosto", value: augustG.length, year:date, guide:true  })}

 const querySeptiembreTuristas = { $and: [] }
  querySeptiembreTuristas.$and.push(querySeptember)
  querySeptiembreTuristas.$and.push(queryTuristas)
  const septemberT = await UserModel.find(querySeptiembreTuristas);
  if (septemberT.length > 0) {
  results.push({ category: "Septiembre", value: septemberT.length, year:date, guide:false })}

  const querySeptiembreGuias = { $and: [] }
  querySeptiembreGuias.$and.push(querySeptember)
  querySeptiembreGuias.$and.push(queryGuia)
  const septemberG = await UserModel.find(querySeptiembreGuias);
  if (septemberG.length > 0) {
  results.push({ category: "Septiembre", value: septemberG.length, year:date, guide:true  })}

  const queryOctubreTuristas = { $and: [] }
  queryOctubreTuristas.$and.push(queryOctober)
  queryOctubreTuristas.$and.push(queryTuristas)
  const octoberT = await UserModel.find(queryOctubreTuristas);
  if (octoberT.length > 0) {
  results.push({ category: "Octubre", value: octoberT.length , year:date, guide:false})}

  const queryOctubreGuias = { $and: [] }
  queryOctubreGuias.$and.push(queryOctober)
  queryOctubreGuias.$and.push(queryGuia)
  const octoberG = await UserModel.find(queryOctubreGuias);
  if (octoberG.length > 0) {
  results.push({ category: "Octubre", value: octoberG.length , year:date, guide:true})}

  const queryNoviembreTuristas = { $and: [] }
  queryNoviembreTuristas.$and.push(queryNovember)
  queryNoviembreTuristas.$and.push(queryTuristas)
  const novemberT = await UserModel.find(queryNoviembreTuristas);
  if (novemberT.length > 0) {
  results.push({ category: "Noviembre", value: novemberT.length, year:date, guide:false })}

  const queryNoviembreGuias = { $and: [] }
  queryNoviembreGuias.$and.push(queryNovember)
  queryNoviembreGuias.$and.push(queryGuia)
  const novemberG = await UserModel.find(queryNoviembreGuias);
  if (novemberG.length > 0) {
  results.push({ category: "Noviembre", value: novemberG.length, year:date, guide:true })}

  const queryDiciembreTuristas = { $and: [] }
  queryDiciembreTuristas.$and.push(queryDecember)
  queryDiciembreTuristas.$and.push(queryTuristas)
  const decemberT = await UserModel.find(queryDiciembreTuristas);
  if (decemberT.length > 0) {
  results.push({ category: "Diciembre", value: decemberT.length , year:date, guide:false})}

  const queryDiciembreGuias = { $and: [] }
  queryDiciembreGuias.$and.push(queryDecember)
  queryDiciembreGuias.$and.push(queryGuia)
  const decemberG = await UserModel.find(queryDiciembreGuias);
  if (decemberG.length > 0) {
  results.push({ category: "Diciembre", value: decemberG.length, year:date , guide:true})}
}

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

  const queryFemRango1 = { $and: [] }
  queryFemRango1.$and.push(queryFem)
  queryFemRango1.$and.push(query1)
  const femeninos1 = await userModel.find(queryFemRango1)
  results.push({ label: "18-24", value: femeninos1.length, color: "#9CD6AE" })

  const queryMascRango1 = { $and: [] }
  queryMascRango1.$and.push(queryMasc)
  queryMascRango1.$and.push(query1)
  const masculino1 = await userModel.find(queryMascRango1)
  results.push({ label: "18-24", value: masculino1.length, color: "#F9AA68" })

  const queryOtroRango1 = { $and: [] }
  queryOtroRango1.$and.push(queryOtro)
  queryOtroRango1.$and.push(query1)
  const otro1 = await userModel.find(queryOtroRango1)
  results.push({ label: "18-24", value: otro1.length, color: "#EA4E41" })

  const queryFemRango2 = { $and: [] }
  queryFemRango2.$and.push(queryFem)
  queryFemRango2.$and.push(query2)
  const femeninos2 = await userModel.find(queryFemRango2)
  results.push({ label: "25-35", value: femeninos2.length, color: "#9CD6AE" })

  const queryMascRango2 = { $and: [] }
  queryMascRango2.$and.push(queryMasc)
  queryMascRango2.$and.push(query2)
  const masculino2 = await userModel.find(queryMascRango2)
  results.push({ label: "25-35", value: masculino2.length, color: "#F9AA68" })

  const queryOtroRango2 = { $and: [] }
  queryOtroRango2.$and.push(queryOtro)
  queryOtroRango2.$and.push(query2)
  const otro2 = await userModel.find(queryOtroRango2)
  results.push({ label: "25-35", value: otro2.length, color: "#EA4E41" })

  const queryFemRango3 = { $and: [] }
  queryFemRango3.$and.push(queryFem)
  queryFemRango3.$and.push(query3)
  const femeninos3 = await userModel.find(queryFemRango3)
  results.push({ label: "36-45", value: femeninos3.length, color: "#9CD6AE" })

  const queryMascRango3 = { $and: [] }
  queryMascRango3.$and.push(queryMasc)
  queryMascRango3.$and.push(query3)
  const masculino3 = await userModel.find(queryMascRango3)
  results.push({ label: "36-45", value: masculino3.length, color: "#F9AA68" })

  const queryOtroRango3 = { $and: [] }
  queryOtroRango3.$and.push(queryOtro)
  queryOtroRango3.$and.push(query3)
  const otro3 = await userModel.find(queryOtroRango3)
  results.push({ label: "36-45", value: otro3.length, color: "#EA4E41" })
  
  const queryFemRango4 = { $and: [] }
  queryFemRango4.$and.push(queryFem)
  queryFemRango4.$and.push(query4)
  const femeninos4 = await userModel.find(queryFemRango4)
  results.push({ label: "46-56", value: femeninos4.length, color: "#9CD6AE" })

  const queryMascRango4 = { $and: [] }
  queryMascRango4.$and.push(queryMasc)
  queryMascRango4.$and.push(query4)
  const masculino4 = await userModel.find(queryMascRango4)
  results.push({ label: "46-56", value: masculino4.length, color: "#F9AA68" })

  const queryOtroRango4 = { $and: [] }
  queryOtroRango4.$and.push(queryOtro)
  queryOtroRango4.$and.push(query4)
  const otro4 = await userModel.find(queryOtroRango4)
  results.push({ label: "46-56", value: otro4.length, color: "#EA4E41" })

  const queryFemRango5 = { $and: [] }
  queryFemRango5.$and.push(queryFem)
  queryFemRango5.$and.push(query5)
  const femeninos5 = await userModel.find(queryFemRango5)
  results.push({ label: "57 o más", value: femeninos5.length, color: "#9CD6AE" })

  const queryMascRango5 = { $and: [] }
  queryMascRango5.$and.push(queryMasc)
  queryMascRango5.$and.push(query5)
  const masculino5 = await userModel.find(queryMascRango5)
  results.push({ label: "57 o más", value: masculino5.length, color: "#F9AA68" })

  const queryOtroRango5 = { $and: [] }
  queryOtroRango5.$and.push(queryOtro)
  queryOtroRango5.$and.push(query5)
  const otro5 = await userModel.find(queryOtroRango5)
  results.push({ label: "57 o más", value: otro5.length, color: "#EA4E41" })

  const queryGuiaRango1= { $and: [] }
  queryGuiaRango1.$and.push(query1)
  queryGuiaRango1.$and.push(queryGuia)
  const guia1 = await userModel.find(queryGuiaRango1)
  results.push({ label: "18-24", value: guia1.length, color: "#F9AA68" })

  const queryTuristaRango1= { $and: [] }
  queryTuristaRango1.$and.push(query1)
  queryTuristaRango1.$and.push(queryTuristas)
  const turista1 = await userModel.find(queryTuristaRango1)
  results.push({ label: "18-24", value: turista1.length, color: "#9CD6AE" })

  const queryGuiaRango2= { $and: [] }
  queryGuiaRango2.$and.push(query2)
  queryGuiaRango2.$and.push(queryGuia)
  const guia2 = await userModel.find(queryGuiaRango2)
  results.push({ label: "25-35", value: guia2.length, color: "#F9AA68" })

  const queryTuristaRango2= { $and: [] }
  queryTuristaRango2.$and.push(query2)
  queryTuristaRango2.$and.push(queryTuristas)
  const turista2 = await userModel.find(queryTuristaRango2)
  results.push({ label: "25-35", value: turista2.length, color: "#9CD6AE" })
  
  const queryGuiaRango3= { $and: [] }
  queryGuiaRango3.$and.push(query3)
  queryGuiaRango3.$and.push(queryGuia)
  const guia3 = await userModel.find(queryGuiaRango3)
  results.push({ label: "36-45", value: guia3.length, color: "#F9AA68" })

  const queryTuristaRango3= { $and: [] }
  queryTuristaRango3.$and.push(query3)
  queryTuristaRango3.$and.push(queryTuristas)
  const turista3 = await userModel.find(queryTuristaRango3)
  results.push({ label: "36-45", value: turista3.length, color: "#9CD6AE" })

  const queryGuiaRango4= { $and: [] }
  queryGuiaRango4.$and.push(query4)
  queryGuiaRango4.$and.push(queryGuia)
  const guia4 = await userModel.find(queryGuiaRango4)
  results.push({ label: "46-56", value: guia4.length, color: "#F9AA68" })

  const queryTuristaRango4= { $and: [] }
  queryTuristaRango4.$and.push(query4)
  queryTuristaRango4.$and.push(queryTuristas)
  const turista4 = await userModel.find(queryTuristaRango4)
  results.push({ label: "46-56", value: turista4.length, color: "#9CD6AE" })

  const queryGuiaRango5= { $and: [] }
  queryGuiaRango5.$and.push(query5)
  queryGuiaRango5.$and.push(queryGuia)
  const guia5 = await userModel.find(queryGuiaRango5)
  results.push({ label: "57 o más", value: guia5.length, color: "#F9AA68" })

  const queryTuristaRango5= { $and: [] }
  queryTuristaRango5.$and.push(query5)
  queryTuristaRango5.$and.push(queryTuristas)
  const turista5 = await userModel.find(queryTuristaRango5)
  results.push({ label: "57 o más", value: turista5.length, color: "#9CD6AE" })

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


  const queryFemGuias = { $and: [] }
  queryFemGuias.$and.push(queryFem)
  queryFemGuias.$and.push(queryGuia)
  const femeninosG = await userModel.find(queryFemGuias)
  results.push({ label: "Guias-Femenino", value: femeninosG.length, color: "#9CD6AE" })

  const queryFemTuristas = { $and: [] }
  queryFemTuristas.$and.push(queryFem)
  queryFemTuristas.$and.push(queryTuristas)
  const femeninosT = await userModel.find(queryFemTuristas)
  results.push({ label: "Turistas-Femenino", value: femeninosT.length, color: "#7dca96" })

  const queryMascGuias = { $and: [] }
  queryMascGuias.$and.push(queryMasc)
  queryMascGuias.$and.push(queryGuia)
  const masculinosG = await userModel.find(queryMascGuias)
  results.push({ label: "Guias-Masculino", value: masculinosG.length, color: "#F9AA68" })

  const queryMascTuristas = { $and: [] }
  queryMascTuristas.$and.push(queryMasc)
  queryMascTuristas.$and.push(queryTuristas)
  const masculinosT = await userModel.find(queryMascTuristas)
  results.push({ label: "Turista-Masculino", value: masculinosT.length, color: "#f7913c" })

  const queryOtroGuias = { $and: [] }
  queryOtroGuias.$and.push(queryOtro)
  queryOtroGuias.$and.push(queryGuia)
  const otroG = await userModel.find(queryOtroGuias)
  results.push({ label: "Guias-Otro", value: otroG.length, color: "#EA4E41" })

  const queryOtroTuristas = { $and: [] }
  queryOtroTuristas.$and.push(queryOtro)
  queryOtroTuristas.$and.push(queryGuia)
  const otroT = await userModel.find(queryOtroTuristas)
  results.push({ label: "Turistas-Otro", value: otroT.length, color: "#883128" })
  
const femenino = await userModel.find(queryFem)
results.push({ label: "Femenino", value: femenino.length, color: "#9CD6AE" })

const masculino = await userModel.find(queryMasc)
results.push({ label: "Masculino", value: masculino.length, color: "#F9AA68" })

const otro = await userModel.find(queryOtro)
results.push({ label: "Otro", value: otro.length, color: "#EA4E41" })

const turistas = await userModel.find(queryTuristas)
results.push({ label: "Turistas", value: turistas.length, color: "#9CD6AE" })

const guias = await userModel.find(queryGuia)
results.push({label:"Guías", value: guias.length, color:"#F9AA68"})

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
  getUsersPerAge,
  getUsersPerLanguages,
  getUsersPerGender,
  getCategoriesPerCity
}
