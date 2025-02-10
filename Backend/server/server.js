const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// Carga variable de entorno
dotenv.config()

// Inicializar con express
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error))

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Taskify Backend is running 🚀')
})

// Inicializar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
