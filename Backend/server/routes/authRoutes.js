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
