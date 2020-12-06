const express = require('express')
const PieceController = require('./Controllers/PieceController')

const routes = express.Router()

routes.post('/piece/new', PieceController.store)
routes.delete('/piece/delete/:piece_id', PieceController.delete)
routes.get('/piece', PieceController.show)

module.exports = routes