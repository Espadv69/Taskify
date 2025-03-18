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
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-400 text-center mb-4">
        Task Manager
      </h1>

      <div className="space-y-3">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition-colors"
        >
          ➕ Add Task
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center p-3 bg-gray-800 rounded-md shadow-sm border border-gray-700"
            >
              <span>
                {task.name} - {task.description}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center">No tasks found</p>
        )}
      </ul>
    </div>
  )
}

export default App
