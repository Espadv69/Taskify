const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' })
  }

  try {
    // Verificar si el usuario existe
    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'User already exists' })

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    // Guardar usuario en la base de datos
    await newUser.save()

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ message: 'Error registering user' })
  }
})

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Buscar usuario
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

module.exports = router
