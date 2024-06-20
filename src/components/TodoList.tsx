import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TodoList = () => {
  const navigate = useNavigate(); // Obtener la función navigate para redireccionar

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  
  const userInStorageString = window.localStorage.getItem('user');
  const userInStorage = JSON.parse(userInStorageString);
  const handleNewButtonClick = () => {
    window.location.href = `/task/createtask`;
  };
  return (
    
      
    <div id="sidebar">
      <h1>Todo List</h1>
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>

        {userInStorage && (
        <div>
          <button onClick={handleNewButtonClick} type="submit" className="new-button">New</button>
        </div>
      )}
  
      </div>
      <nav>
        <ul>
          <li>
            <Link to={`/perfil/1`}>Mi perfil</Link>
          </li>
          <li>
            <Link to={`/tasks/`}>Mis Tareas</Link>
          </li>
        </ul>
      </nav>
      {userInStorage && (
        <div>
          <button className="new-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
      </div>
  );
};

export default TodoList;
