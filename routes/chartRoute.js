const express = require('express')
const routeController = require('../commons/routeController')
const router = express.Router()
const chartController = require('../controllers/chartController')

//GRÁFICO CANTIDAD POR MESES 
router.get('/matchesPerMonth', async (req, res) => {
  routeController.handleRequest(req, res, chartController.getQuantityPerMonth)
})


//GRÁFICO CATEOGRÍA POR SEXO Y EDAD 

//router.get('/category', async (req, res) => {
//   routeController.handleRequest(req, res, chartController.getChartCategory)
// })



module.exports = router
