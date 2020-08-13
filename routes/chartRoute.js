const express = require('express')
const routeController = require('../commons/routeController')
const router = express.Router()
const chartController = require('../controllers/chartController')

//GRÁFICO CANTIDAD POR MESES 
router.get('/matchesPerMonth', async (req, res) => {
  
  routeController.handleRequest(req, res, chartController.getMatchesPerMonth)
})

//GRAFICO USUARIOS CREDOS POR MES por año
router.get('/usersCreatedPerMonth/:date', async (req, res) => {
  
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

//GRÁFICO CATEOGRÍA POR SEXO Y EDAD 

//router.get('/category', async (req, res) => {
//   routeController.handleRequest(req, res, chartController.getChartCategory)
// })



module.exports = router
