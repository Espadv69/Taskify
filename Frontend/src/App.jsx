import { useState, useEffect } from 'react'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Función para obtener tareas del backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setTasks(data) // Guardar tareas en el estado
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

      if (!response.ok) throw new Error('Failed to add task')
      const data = await response.json()

      setTasks((prevTasks) => [...prevTasks, data]) // Agregar la tarea sin perder las anteriores
      setTaskName('')
      setTaskDescription('')
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
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task Description"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id}>
              {task.name} - {task.description}
            </li>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </ul>
    </div>
  )
}

export default App
