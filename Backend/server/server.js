const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

// Inicializar con express
const app = express()

// Carga variable de entorno
dotenv.config()


// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error))

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Taskify Backend is running 🚀')
})

// Authentication routes to Express app
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
console.log('✅ Authentication routes loaded')

// Inicializar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on  http://localhost:${PORT}`)
})
