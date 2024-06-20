import React from 'react';
import '../Task.css';

const Task = ({ tasks }) => {
  return (
    <div className="task-container">
      <h2>Tareas del Usuario</h2>
      <div className="task-cards">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-header">
              <h3>{task.name}</h3>
              <p>Status: {task.status}</p>
            </div>
            <div className="task-content">
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
