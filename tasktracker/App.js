import React, { useState } from 'react';
import './App.css';
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Morning Exercise', completed: false },
    { id: 2, text: 'Do Breakfast', completed: true },
    { id: 3, text: 'Check Emails', completed: false },
    { id: 4, text: 'Attend Meeting', completed: false },
    { id: 5, text: 'Have Lunch', completed: false },
    { id: 6, text: 'Work on Project', completed: false },
    { id: 7, text: 'Evening Walk', completed: false },
    { id: 8, text: 'Have Dinner', completed: false },
  ]);
  const addTask = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
    </div>
  );
}
function TaskList({ tasks, deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}
function TaskItem({ task, deleteTask, toggleComplete }) {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.text}
      <button onClick={() => toggleComplete(task.id)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
function AddTask({ addTask }) {
  const [newTask, setNewTask] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
export default App;
