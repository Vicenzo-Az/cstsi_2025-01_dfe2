import React, { useState, useEffect, useRef } from 'react';
import Task from './Task';
import '../App.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const newTitleRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const title = newTitleRef.current.value.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, steps: [] }]);
    newTitleRef.current.value = '';
    newTitleRef.current.focus();
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (updated) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  return (
    <div>
      <div className="task-input-container">
        <input
          ref={newTitleRef}
          className="task-input"
          placeholder="Nova tarefa"
        />
        <button onClick={addTask} className="add-task-btn">Adicionar</button>
      </div>
      <div className="tasks-container">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
}