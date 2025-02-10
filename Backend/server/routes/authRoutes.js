const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Verificar si el usuario existe
    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'User already exists' })

    // Crear nuevo usuario
    const user = new User({ name, email, password })
    await user.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
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
