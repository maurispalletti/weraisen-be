const MatchModel = require('../models/MatchModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants');
const userModel = require('../models/userModel');
//const { getCitiesPerMonth } = require('../delegates/chartDelegate');

const { matches: { status: { ACTIVE } } } = constants;

const createMatch = async ({ tourist, guide, chatId, status, matchDate, city, knowledge }) => {
  const newMatch = new MatchModel({ tourist, guide, chatId, status, matchDate, city, knowledge })

  const savedMatch = await newMatch.save({ new: true })

  if (savedMatch) {
    return savedMatch
  }
  throw new error.AppError(exceptions.exceptionType.match.createMatch, 'matchService.createMatch')
}

const getMatchByUserIds = async ({ tourist, guide }) => {

  const match = await MatchModel.find({ tourist, guide })

  if (match) {
    return match
  }
  return null
}

const getActiveMatchByUserIds = async ({ tourist, guide }) => {
  const query = { tourist, guide, status: ACTIVE }

  const match = await MatchModel.findOne(query)

  if (match) {
    return match
  }
  return null
}

const getActiveMatchesByUser = async userId => {
  const query = { $or: [{ tourist: userId }, { guide: userId }], status: ACTIVE }

  const matches = await MatchModel.find(query)

  if (matches) {
    return matches
  }
  return []
}

const getMatch = async id => {
  const match = MatchModel.findById(id)
  if (match) {
    return match
  }
  throw new error.AppError(exceptions.exceptionType.match.notFound, 'matchService.getMatch')
}

const getMatchesByUser = async userId => {
  const query = { $or: [{ tourist: userId }, { guide: userId }] }

  const matches = await MatchModel.find(query).sort({ createdAt: -1 })

  if (matches) {
    return matches
  }
  return []
}

const getMatchByChatId = async chatId => {
  const match = await MatchModel.findOne({ chatId })

  if (match) {
    return match
  }
  throw new error.AppError(exceptions.exceptionType.match.notFound, 'matchService.getMatch')
}

const updateMatch = async (chatId, status) => {
  return MatchModel.findOneAndUpdate(chatId, { $set: { status } }, { new: true })
}

const updateMatchById = async (id, status) => {
  return MatchModel.findByIdAndUpdate(id, { $set: { status } }, { new: true })
}

const updateMatchByIdDate = async (id, matchDate) => {
  return MatchModel.findByIdAndUpdate(id, { $set: { matchDate } }, { new: true })
}
//informes
const queryJanuary = { createdAt: { $gte: new Date(2020, 0, 01), $lte: new Date(2020, 0, 31) } }
const queryFebruary = { createdAt: { $gte: new Date(2020, 01, 01), $lte: new Date(2020, 01, 28) } }
const queryMarch = { createdAt: { $gte: new Date(2020, 02, 01), $lte: new Date(2020, 02, 31) } }
const queryApril = { createdAt: { $gte: new Date(2020, 03, 01), $lte: new Date(2020, 03, 30) } }
const queryMay = { createdAt: { $gte: new Date(2020, 04, 01), $lte: new Date(2020, 04, 31) } }
const queryJune = { createdAt: { $gte: new Date(2020, 05, 01), $lte: new Date(2020, 05, 30) } }
const queryJuly = { createdAt: { $gte: new Date(2020, 06, 01), $lte: new Date(2020, 06, 31) } }
const queryAugust = { createdAt: { $gte: new Date(2020, 07, 01), $lte: new Date(2020, 07, 31) } }
const querySeptember = { createdAt: { $gte: new Date(2020, 08, 01), $lte: new Date(2020, 08, 30) } }
const queryOctober = { createdAt: { $gte: new Date(2020, 09, 01), $lte: new Date(2020, 09, 31) } }
const queryNovember = { createdAt: { $gte: new Date(2020, 10, 01), $lte: new Date(2020, 10, 30) } }
const queryDecember = { createdAt: { $gte: new Date(2020, 11, 01), $lte: new Date(2020, 11, 31) } }



const getMatchesPerMonth = async () => {
  let results = [];

  try {

    const january = await MatchModel.find(queryJanuary);
    if (january.length > 0) {
      results.push({ category: "Enero", value: january.length })
    }

    const february = await MatchModel.find(queryFebruary);
    if (february.length > 0) {
      results.push({ category: "Febrero", value: february.length })
    }

    const march = await MatchModel.find(queryMarch);
    if (march.length > 0) {
      results.push({ category: "Marzo", value: march.length })
    }

    const april = await MatchModel.find(queryApril);
    if (april.length > 0) {
      results.push({ category: "Abril", value: april.length })
    }

    const may = await MatchModel.find(queryMay);
    if (may.length > 0) {
      results.push({ category: "Mayo", value: may.length })
    }

    const june = await MatchModel.find(queryJune);
    if (june.length > 0) {
      results.push({ category: "Junio", value: june.length })
    }

    const july = await MatchModel.find(queryJuly);
    if (july.length > 0) {
      results.push({ category: "Julio", value: july.length })
    }

    const august = await MatchModel.find(queryAugust);
    if (august.length > 0) {
      results.push({ category: "Agosto", value: august.length })
    }

    const september = await MatchModel.find(querySeptember);
    if (september.length > 0) {
      results.push({ category: "Septiembre", value: september.length })
    }

    const october = await MatchModel.find(queryOctober);
    if (october.length > 0) {
      results.push({ category: "Octubre", value: october.length })
    }

    const november = await MatchModel.find(queryNovember);
    if (november.length > 0) {
      results.push({ category: "Noviembre", value: november.length })
    }

    const december = await MatchModel.find(queryDecember);
    if (december.length > 0) {
      results.push({ category: "Diciembre", value: december.length })
    }


    return results;

  } catch (error) {
    throw new error.AppError(exceptions.exceptionType.match.queryFailed, 'matchService.getQuantityPerMonth')
  }

}




const getCitiesPerMatch = async () => {

  let ciudades = ["Buenos Aires", "Bariloche", "Comodoro Rivadavia", "Cordoba", "Corrientes", "Cosquin", "El Bolson", "El Chalten", "Esquel", "Formosa", "General Pico",
    "Gualeguaychu", "Humauaca", "La Cumbrecita", "LaPlata", "La Rioja", "Mardel", "Mendoza", "Merlo", "Neuquen", "Mina Clavero", "Monte Hermoso", "Parana", "Perito Moreno",
    "Pinamar", "Posadas", "Puerto Iguazu", "Puerto Madryn", "Resistencia", "Rio Gallegos", "Rio Grande", "Rosario", "Salta", "San Fernando del Valle de Catamarca", "San Juan", "San Luis", "San Martin de los Andes",
    "San Miguel de Tucuman", "San Rafael", "San Salvador de Jujuy", "Santa Fe", "Santa Rosa", "Santiago Del Estero", "Termas de Rio Hondo", "Tilcara", "Trelew", "Ushuaia", "Villa Carlos Paz",
    "Villa Maria",];

  let results = [];

  for (let index = 0; index < ciudades.length; index++) {
    const ciudad = ciudades[index];

    const queryCiudad = { city: ciudad }



    const resultadoCiudades = await MatchModel.find(queryCiudad);
    //return { category: ciudad, value: resultadoCiudades.length }
    if (resultadoCiudades.length > 0) {
      results.push({ category: ciudad, value: resultadoCiudades.length })
    }
  }


  return results
}

const getMatchesPerCategories = async () => {

  let results = [];

  const queryNoche = ({ knowledge: "noche" })
  const queryDeportes = ({ knowledge: "deportes" })
  const queryAventura = ({ knowledge: "aventura" })
  const queryShopping = ({ knowledge: "shopping" })
  const queryCultura = ({ knowledge: "cultura" })
  const queryGastronomia = ({ knowledge: "gastronomia" })

  const noche = await MatchModel.find(queryNoche)
  results.push({ label: "Noche", value: noche.length, color: "#F9AA68" })
  const deportes = await MatchModel.find(queryDeportes)
  results.push({ label: "Deportes", value: deportes.length, color: "#9CD6AE" })
  const aventura = await MatchModel.find(queryAventura)
  results.push({ label: "Aventura", value: aventura.length, color: "#EA4E41" })
  const shopping = await MatchModel.find(queryShopping)
  results.push({ label: "Shopping", value: shopping.length, color: "#883128" })
  const cultura = await MatchModel.find(queryCultura)
  results.push({ label: "Cultura", value: cultura.length, color: "#F7913C" })
  const gastronomia = await MatchModel.find(queryGastronomia)
  results.push({ label: "Gastronomía", value: gastronomia.length, color: "#7DCA96" })
  return results;
}

const getMatchesPerMonthForGuide = async userId => {
  const queryGuide = { guide: userId }

  let results = [];


  const queryEnero = { $and: [] }
  queryEnero.$and.push(queryGuide)
  queryEnero.$and.push(queryJanuary)
  const january = await MatchModel.find(queryEnero);
  if (january.length > 0) {
    results.push({ category: "Enero", value: january.length })
  }
  const queryFebrero = { $and: [] }
  queryFebrero.$and.push(queryGuide)
  queryFebrero.$and.push(queryFebruary)
  const february = await MatchModel.find(queryFebrero);
  if (february.length > 0) {
    results.push({ category: "Febrero", value: february.length })
  }
  const queryMarzo = { $and: [] }
  queryMarzo.$and.push(queryGuide)
  queryMarzo.$and.push(queryMarch)
  const march = await MatchModel.find(queryMarzo);
  if (march.length > 0) {
    results.push({ category: "Marzo", value: march.length })
  }
  const queryAbril = { $and: [] }
  queryAbril.$and.push(queryGuide)
  queryAbril.$and.push(queryApril)
  const april = await MatchModel.find(queryAbril);
  if (april.length > 0) {
    results.push({ category: "Abril", value: april.length })
  }
  const queryMayo = { $and: [] }
  queryMayo.$and.push(queryGuide)
  queryMayo.$and.push(queryMay)
  const may = await MatchModel.find(queryMayo);
  if (may.length > 0) {
    results.push({ category: "Mayo", value: may.length })
  }
  const queryJunio = { $and: [] }
  queryJunio.$and.push(queryGuide)
  queryJunio.$and.push(queryJune)
  const june = await MatchModel.find(queryJunio);
  if (june.length > 0) {
    results.push({ category: "Junio", value: june.length })
  }

  const queryJulio = { $and: [] }
  queryJulio.$and.push(queryGuide)
  queryJulio.$and.push(queryJuly)
  const july = await MatchModel.find(queryJulio);
  if (july.length > 0) {
    results.push({ category: "Julio", value: july.length })
  }
  const queryAgosto = { $and: [] }
  queryAgosto.$and.push(queryGuide)
  queryAgosto.$and.push(queryAugust)
  const august = await MatchModel.find(queryAgosto);
  if (august.length > 0) {
    results.push({ category: "Agosto", value: august.length })
  }
  const querySeptiembre = { $and: [] }
  querySeptiembre.$and.push(queryGuide)
  querySeptiembre.$and.push(querySeptember)
  const september = await MatchModel.find(querySeptiembre);
  if (september.length > 0) {
    results.push({ category: "Septiembre", value: september.length })
  }
  const queryOctubre = { $and: [] }
  queryOctubre.$and.push(queryGuide)
  queryOctubre.$and.push(queryOctober)
  const october = await MatchModel.find(queryOctubre);
  if (october.length > 0) {
    results.push({ category: "Octubre", value: october.length })
  }
  const queryNoviembre = { $and: [] }
  queryNoviembre.$and.push(queryGuide)
  queryNoviembre.$and.push(queryNovember)
  const november = await MatchModel.find(queryNoviembre);
  if (november.length > 0) {
    results.push({ category: "Noviembre", value: november.length })
  }
  const queryDiciembre = { $and: [] }
  queryDiciembre.$and.push(queryGuide)
  queryDiciembre.$and.push(queryDecember)
  const december = await MatchModel.find(queryDiciembre);
  if (december.length > 0) {
    results.push({ category: "Diciembre", value: december.length })
  }


  return results;




}

const getMatchesByStatusForGuide = async userId => {
  const queryGuide = { guide: userId }

  queryPendiente = ({ status: "Pendiente" })
  queryFinalizado = ({ status: "Finalizado" })
  queryCancelado = ({ status: "Cancelado" })
  queryActivo = ({ status: "Activo" })


  let results = [];

  const queryPendienteGuia = { $and: [] }
  queryPendienteGuia.$and.push(queryGuide)
  queryPendienteGuia.$and.push(queryPendiente)
  const pendiente = await MatchModel.find(queryPendienteGuia);
  if (pendiente.length > 0) {
    results.push({ label: "Pendiente", value: pendiente.length, color: "#FBF34A" })
  }
  const queryFinalizadoGuia = { $and: [] }
  queryFinalizadoGuia.$and.push(queryGuide)
  queryFinalizadoGuia.$and.push(queryFinalizado)
  const finalizado = await MatchModel.find(queryFinalizadoGuia);
  if (finalizado.length > 0) {
    results.push({ label: "Finalizado", value: finalizado.length, color: "#9CD6AE" })
  }

  const queryCanceladoGuia = { $and: [] }
  queryCanceladoGuia.$and.push(queryGuide)
  queryCanceladoGuia.$and.push(queryCancelado)
  const cancelado = await MatchModel.find(queryCanceladoGuia);
  if (cancelado.length > 0) {
    results.push({ label: "Cancelado", value: cancelado.length, color: "#EA4E41" })
  }
  const queryActivoGuia = { $and: [] }
  queryActivoGuia.$and.push(queryGuide)
  queryActivoGuia.$and.push(queryActivo)
  const activo = await MatchModel.find(queryActivoGuia);
  if (activo.length > 0) {
    results.push({ label: "Activo", value: cancelado.length, color: "#F9AA68" })
  }
  return results
}
module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
  getActiveMatchByUserIds,
  getMatchByChatId,
  updateMatch,
  getMatchesPerMonth,
  getActiveMatchesByUser,
  updateMatchById,
  getCitiesPerMatch,
  getMatchesPerCategories,
  getMatchesPerMonthForGuide,
  getMatchesByStatusForGuide,
  updateMatchByIdDate
}
