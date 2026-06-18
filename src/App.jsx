import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to hold the current input value
  const [inputValue, setInputValue] = useState('');

  // 1. Add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    if (inputValue.trim() === '') return; // Don't add empty tasks

    const newTask = {
      id: Date.now(), // Unique ID
      text: inputValue,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue(''); // Clear input field
  };

  // 2. Toggle task completion (Mark as done)
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // 3. Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Task Master</h1>
      
      {/* Input Form */}
      <form onSubmit={addTask} className="todo-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul className="todo-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Enjoy your day!</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={task.isCompleted ? 'completed' : ''}>
              <span onClick={() => toggleComplete(task.id)}>
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;