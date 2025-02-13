const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Task = require('./models/Task')

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

// Endpoint para agregar una tarea
app.post('/tasks', async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: 'Both name and desciption are required' })
    }

    const newTask = new Task({ name, description })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (err) {
    console.error('Error adding task:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
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
