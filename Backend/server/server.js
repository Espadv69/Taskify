const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')

// Carga variable de entorno
dotenv.config()

// Inicializar con express
const app = express()
