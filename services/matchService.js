const MatchModel = require('../models/MatchModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

const {
  matches: {
    status: { INICIATED, CREATED },
  } } = constants;


const createMatch = async ({ tourist, guide, chatId }) => {
  const newMatch = new MatchModel({ tourist, guide, chatId })

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
  const query = { tourist, guide, $or: [{ status: INICIATED }, { status: CREATED }] }

  const match = await MatchModel.findOne(query)

  if (match) {
    return match
  }
  return null
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

  const matches = await MatchModel.find(query)

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


const getQuantityPerMonth = async () => {
  let results = [];

  try {

    const queryJanuary = { createdAt: { $gte: new Date(2019, 0, 01), $lte: new Date(2019, 0, 31) } }
    const january = await MatchModel.find(queryJanuary);
    results.push({ month: "Enero", value: january.length })
    // results.push({ january: january.length })

    const queryFebruary = { createdAt: { $gte: new Date(2019, 01, 01), $lte: new Date(2019, 01, 28) } }
    const february = await MatchModel.find(queryFebruary);
    results.push({ month: "Febrero", value: february.length })
    // results.push({ february: february.length })

    const queryMarch = { createdAt: { $gte: new Date(2019, 02, 01), $lte: new Date(2019, 02, 31) } }
    const march = await MatchModel.find(queryMarch);
    results.push({ month: "Marzo", value: march.length })
    // results.push({ march: march.length })

    const queryApril = { createdAt: { $gte: new Date(2019, 03, 01), $lte: new Date(2019, 03, 30) } }
    const april = await MatchModel.find(queryApril);
    results.push({ month: "Abril", value: april.length })
    // results.push({ april: april.length })

    const queryMay = { createdAt: { $gte: new Date(2019, 04, 01), $lte: new Date(2019, 04, 31) } }
    const may = await MatchModel.find(queryMay);
    results.push({ month: "Mayo", value: may.length })
    // results.push({ may: may.length })

    const queryJune = { createdAt: { $gte: new Date(2019, 05, 01), $lte: new Date(2019, 05, 30) } }
    const june = await MatchModel.find(queryJune);
    results.push({ month: "Junio", value: june.length })
    // results.push({ june: june.length })

    const queryJuly = { createdAt: { $gte: new Date(2019, 06, 01), $lte: new Date(2019, 06, 31) } }
    const july = await MatchModel.find(queryJuly);
    results.push({ month: "Julio", value: july.length })
    // results.push({ july: july.length })

    const queryAugust = { createdAt: { $gte: new Date(2019, 07, 01), $lte: new Date(2019, 07, 31) } }
    const august = await MatchModel.find(queryAugust);
    results.push({ month: "Agosto", value: august.length })
    // results.push({ august: august.length })

    const querySeptember = { createdAt: { $gte: new Date(2019, 08, 01), $lte: new Date(2019, 08, 30) } }
    const september = await MatchModel.find(querySeptember);
    results.push({ month: "Septiembre", value: september.length })
    // results.push({ september: september.length })

    const queryOctober = { createdAt: { $gte: new Date(2019, 09, 01), $lte: new Date(2019, 09, 31) } }
    const october = await MatchModel.find(queryOctober);
    results.push({ month: "Octubre", value: october.length })
    // results.push({ october: october.length })

    const queryNovember = { createdAt: { $gte: new Date(2019, 10, 01), $lte: new Date(2019, 10, 30) } }
    const november = await MatchModel.find(queryNovember);
    results.push({ month: "Noviembre", value: november.length })
    // results.push({ november: november.length })

    const queryDecember = { createdAt: { $gte: new Date(2019, 11, 01), $lte: new Date(2019, 11, 31) } }
    const december = await MatchModel.find(queryDecember);
    results.push({ month: "Diciembre", value: december.length })
    // results.push({ december: december.length })

    return results;

  } catch (error) {
    throw new error.AppError(exceptions.exceptionType.match.queryFailed, 'matchService.getQuantityPerMonth')
  }

}




module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
  getActiveMatchByUserIds,
  getMatchByChatId,
  updateMatch,
  getQuantityPerMonth,
}
