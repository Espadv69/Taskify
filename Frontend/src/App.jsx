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

  // Obtener las tareas cuando el componente se monte
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task Name"
      />

      <input
        type="text"
        value={taskDescription}
        onChange={(e) => settaskDescription(e.target.value)}
        placeholder="Task Description"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
