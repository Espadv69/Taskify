const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
)

// Middleware: Hashear la contraseña antes de guardar el usuario
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Exportar el modelo
module.exports = mongoose.model('User', UserSchema)
