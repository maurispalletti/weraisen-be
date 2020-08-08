const UserModel = require('../models/userModel')
const exceptions = require('../commons/exceptions')
const error = require('../commons/error')
const constants = require('../commons/constants')

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
  const user = await UserModel.findOne({ email, password})
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


const getUsersCreatedPerMonth = async () => {
  let results = [];

  try {

    const queryJanuary = { createdAt: { $gte: new Date(2020, 0, 01), $lte: new Date(2020, 0, 31) } }
    const january = await UserModel.find(queryJanuary);
    results.push({ month: "Enero", value: january.length })
    // results.push({ january: january.length })

    const queryFebruary = { createdAt: { $gte: new Date(2020, 01, 01), $lte: new Date(2020, 01, 28) } }
    const february = await UserModel.find(queryFebruary);
    results.push({ month: "Febrero", value: february.length })
    // results.push({ february: february.length })

    const queryMarch = { createdAt: { $gte: new Date(2020, 02, 01), $lte: new Date(2020, 02, 31) } }
    const march = await UserModel.find(queryMarch);
    results.push({ month: "Marzo", value: march.length })
    // results.push({ march: march.length })

    const queryApril = { createdAt: { $gte: new Date(2020, 03, 01), $lte: new Date(2020, 03, 30) } }
    const april = await UserModel.find(queryApril);
    results.push({ month: "Abril", value: april.length })
    // results.push({ april: april.length })

    const queryMay = { createdAt: { $gte: new Date(2020, 04, 01), $lte: new Date(2020, 04, 31) } }
    const may = await UserModel.find(queryMay);
    results.push({ month: "Mayo", value: may.length })
    // results.push({ may: may.length })

    const queryJune = { createdAt: { $gte: new Date(2020, 05, 01), $lte: new Date(2020, 05, 30) } }
    const june = await UserModel.find(queryJune);
    results.push({ month: "Junio", value: june.length })
    // results.push({ june: june.length })

    const queryJuly = { createdAt: { $gte: new Date(2020, 06, 01), $lte: new Date(2020, 06, 31) } }
    const july = await UserModel.find(queryJuly);
    results.push({ month: "Julio", value: july.length })
    // results.push({ july: july.length })

    const queryAugust = { createdAt: { $gte: new Date(2020, 07, 01), $lte: new Date(2020, 07, 31) } }
    const august = await UserModel.find(queryAugust);
    results.push({ month: "Agosto", value: august.length })
    // results.push({ august: august.length })

    const querySeptember = { createdAt: { $gte: new Date(2020, 08, 01), $lte: new Date(2020, 08, 30) } }
    const september = await UserModel.find(querySeptember);
    results.push({ month: "Septiembre", value: september.length })
    // results.push({ september: september.length })

    const queryOctober = { createdAt: { $gte: new Date(2020, 09, 01), $lte: new Date(2020, 09, 31) } }
    const october = await UserModel.find(queryOctober);
    results.push({ month: "Octubre", value: october.length })
    // results.push({ october: october.length })

    const queryNovember = { createdAt: { $gte: new Date(2020, 10, 01), $lte: new Date(2020, 10, 30) } }
    const november = await UserModel.find(queryNovember);
    results.push({ month: "Noviembre", value: november.length })
    // results.push({ november: november.length })

    const queryDecember = { createdAt: { $gte: new Date(2020, 11, 01), $lte: new Date(2020, 11, 31) } }
    const december = await UserModel.find(queryDecember);
    results.push({ month: "Diciembre", value: december.length })
    // results.push({ december: december.length })

    return results;

  } catch (error) {
    throw new error.AppError(exceptions.exceptionType.match.queryFailed, 'userService.getQuantityPerMonth')
  }

}


module.exports = {
  createUser,
  login,
  findUserById,
  findUsersByStatus,
  updateUserStatus,
  getUsersCreatedPerMonth,
}
