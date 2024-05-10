import React from 'react';
import '../Task.css'

const Task = ({ tasks }) => {
  return (
    <div>
      <h2>Tareas del Usuario</h2>
      <table className='tableTasks'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
