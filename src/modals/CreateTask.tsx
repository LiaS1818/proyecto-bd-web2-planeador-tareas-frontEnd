import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3010/'; // Asegúrate de que esta es la URL correcta de tu API

const CreateTask = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user");
    const userInStorage = JSON.parse(userInStorageString);
    if (userInStorage && userInStorage.token) {
      setUser(userInStorage);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = { name, status: "pendiente", description };

    try {
      const response = await fetch(`${API_URL}api/v1/task/`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        const responseData = await response.json();
        console.log('Tarea creada:', responseData);
        setSuccessMessage('Tarea creada exitosamente.');
      } else if (response.status === 204) {
        console.log('Tarea creada sin contenido en la respuesta.');
        setSuccessMessage('Tarea creada exitosamente.');
      } else {
        const errorData = await response.json();
        console.error('Error al crear la tarea:', errorData);
        setSuccessMessage('Error al crear la tarea.');
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      setSuccessMessage('Error al crear la tarea.');
    }

    setName('');
    setDescription('');
  };

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descripción</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTask;
