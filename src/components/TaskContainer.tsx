import React, { useEffect, useState } from 'react';
import Task from './Task';

const API_URL = 'http://localhost:3010/'; // Asegúrate de que esta es la URL correcta de tu API

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userInStorageString = window.localStorage.getItem("user");
    const userInStorage = JSON.parse(userInStorageString);

        if (!userInStorage || !userInStorage.token || !userInStorage.user._id) {
          throw new Error('Datos de autenticación no encontrados');
        }

        const { token, user } = userInStorage;

        const response = await fetch(`${API_URL}api/v1/task/misTasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las tareas');
        }

        const data = await response.json();
        setTasks(data);
        setShowData(true);
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {showData && <Task tasks={tasks} />}
    </div>
  );
};

export default TaskContainer;
