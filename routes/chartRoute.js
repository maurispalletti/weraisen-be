const express = require('express')
const routeController = require('../commons/routeController')
const router = express.Router()
const chartController = require('../controllers/chartController')

//GRÁFICO CANTIDAD POR MESES 
router.get('/matchesPerMonth', async (req, res) => {
  
  routeController.handleRequest(req, res, chartController.getMatchesPerMonth)
})

//GRAFICO USUARIOS CREDOS POR MES por año
router.get('/usersCreatedPerMonth', async (req, res) => {
  
  routeController.handleRequest(req, res, chartController.getUsersCreatedPerMonth)
})

//GRAFICO USUARIOS DENUNCIADOS POR TIPO
router.get('/usersReportedPerReason', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getUsersReportedPerReason)
})


//GRAFICO CIUDADES MAS ELEGIDAS POR MESS
router.get('/citiesPerMatch', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getCitiesPerMatch)
})

//GRAFICO CATEGORIAS POR GENERO

router.get('/categoriesPerGender', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getCategoriesPerGender)
})

//GRÁFICO usuarios por edad
router.get('/usersPerAge', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getUsersPerAge)
})

router.get('/usersPerLanguages', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getUsersPerLanguages)
})

//router.get('/category', async (req, res) => {
//   routeController.handleRequest(req, res, chartController.getChartCategory)
// })
//grafico usuarios por género
router.get('/usersPerGender', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getUsersPerGender)
})
//grafico encuentros por categoria por ciudad
router.get('/matchesPerCategories', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getMatchesPerCategories)
})

router.get('/categoriesPerCity', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getCategoriesPerCity)
})

router.get('/matchesPerMonthForGuide/:userId', async (req, res) => {
  
  routeController.handleRequest(req, res, chartController.getMatchesPerMonthForGuide)
})
router.get('/getMatchesByStatusForGuide/:userId', async (req, res) => {
  
  routeController.handleRequest(req, res, chartController.getMatchesByStatusForGuide)
})



module.exports = router
