const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose
  .connect('mongodb://127.0.0.1:27017/tasks')
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('MongoDB connection failed ❌', err))

app.get('/', async (req, res) => {
  res.send('This is the body page')
})

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)

const cleanUp = async () => {
  console.log('\n🔻 Closing server...')

  try {
    await mongoose.connection.close()
    console.log('🗑️ MongoDB connection closed.')
  } catch (err) {
    console.error('Error closing MongoDB:', err)
  }

  server.close(() => {
    console.log('✅ Server shut down')
    process.exit(0)
  })
}

// Capturar señales para apagar el servidor limpiamente
process.on('SIGINT', cleanUp) // Ctrl + C en el terminal
process.on('SIGTERM', cleanUp) // Signal de sistemas tipo Linux
