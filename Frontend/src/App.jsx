import { useState, useEffect } from 'react'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [editingTask, setEditingTask] = useState(null) // Guardar tarea en edición
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

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

  // Función para borrar una tarea
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete task')
      const data = await response.json()

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== data._id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  // Función para activar el modo edición
  const startEditing = (task) => {
    setEditingTask(task._id)
    setEditedName(task.name)
    setEditedDescription(task.description)
  }

  // Función para manejar la actualización real
  const handleUpdate = async () => {
    if (!editedName || !editedDescription)
      return alert('Both fields are required')

    const updatedTask = { name: editedName, description: editedDescription }

    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${editingTask}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        }
      )

      if (!response.ok) throw new Error('Failed to update task')
      const data = await response.json()

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === data._id ? data : task))
      )
      setEditingTask(null) // Salir del modo edición
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  // Obtener las tareas cuando el componente se monte
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
        Task Manager
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={addTask}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-md transition-colors"
        >
          ➕ Add Task
        </button>
      </div>

      <ul className="mt-6 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 flex justify-between items-center"
            >
              {editingTask === task._id ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 hover:bg-green-400 text-white font-medium px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-medium px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg">
                    {task.name} - {task.description}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(task)}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-400 text-white font-medium px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
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
