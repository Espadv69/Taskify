const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

export default mongoose.model('Task', TaskSchema)
