const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://zensadb:zensadb@cluster0.f1kph.mongodb.net/zensadb?retryWrites=true&w=majority', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})

app.use(express.json())

app.listen(3334)
