const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

// Carga variable de entorno
dotenv.config()

// Inicializar con express
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error))
