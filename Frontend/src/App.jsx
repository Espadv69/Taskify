import { useState, useEffect } from 'react'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, settaskDescription] = useState('')

  // Función para obtener tareas del backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  // Función para agregar una nueva tarea
  const addTask = async () => {
    if (!taskName || !taskDescription) return alert('Both fields are required')

    const newTask = { name: taskName, description: taskDescription }

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })

      const data = await response.json()
      setTasks([...tasks, data]) // Agregar la nueva tarea
      setTaskName('')
      settaskDescription('')
    } catch (err) {
      console.error('Error adding task:', err)
    }
  }
}

export default App
