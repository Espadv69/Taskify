# Taskify

Taskify is a full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, update, delete, and filter tasks efficiently.
## Features
- Task management (Create, Read, Update, Delete)
- RESTful API backend using Node.js and Express
- MongoDB as the database
- Frontend built with React (Vite)
- API communication using Axios

## Technologies Used
- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** Mongoose (ODM for MongoDB)

## Installation
### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- MongoDB (installed locally or using a cloud service like MongoDB Atlas)

### Clone the Repository
```sh
git clone https://github.com/Espadv69/taskify.git
cd taskify
```

### Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file and configure the environment variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
4. Start the backend server:
```sh
npm run dev
```

### Frontend Setup
1. Navigate to the frontend folder:
```sh
cd ../frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the React development server:
```sh
npm run dev
```

## API Endpoints
### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
