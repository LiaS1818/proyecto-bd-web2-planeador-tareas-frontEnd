import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Task from "./Task";
import "../Form.css"; // Archivo de estilos para el LoginPage

const API_URL = 'http://localhost:3010/';

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showData, setShowData] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const navigate = useNavigate(); // Obtén la función navigate para redirigir

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user");
    const userInStorage = JSON.parse(userInStorageString);
    if (userInStorage && userInStorage.token) {
      setUser(userInStorage);
      navigate('/'); // Redirige al usuario a la ruta principal si ya está autenticado
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.token) {
      fetchTasks();
    }
  }, [user?.token]);

  const handleOnInputChange = (stateUpdate) => {
    return (event) => {
      stateUpdate(event.target.value);
    };
  };

  const logIn = async ({ email, password }) => {
    try {
      const response = await fetch(`${API_URL}api/v1/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        window.localStorage.setItem("user", JSON.stringify(data));
        setLoginError(false);
        setShowData(true);
        navigate('/'); // Redirige al usuario a la ruta principal después del login
        fetchTasks();
      } else {
        setLoginError(true);
        setShowData(false);
      }
    } catch (error) {
      console.error(error);
      setLoginError(true); // Maneja el error de inicio de sesión
      setShowData(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}api/v1/task/misTasks`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      setUserTasks(data);
    } catch (error) {
      console.log(error);
      setLoginError(true); // Maneja el error de carga de tareas
    }
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    logIn({ email, password });
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
    setShowData(false);
    navigate('/login'); // Redirige al usuario a la ruta de inicio de sesión después de cerrar sesión
  };

  return (
    <div className="login-container">
      {user && (
        <section className="dataContainer">
          <>
            <p>Name: {user.user.name}</p>
            <p>Email: {user.user.email}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        </section>
      )}
      {showData && <Task tasks={userTasks} />}
      <section className="formContainer">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleOnClick}>
          <div className="inputContainer">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleOnInputChange(setEmail)} />
          </div>

          <div className="inputContainer">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handleOnInputChange(setPassword)} />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        {loginError && <Error message="Usuario o contraseña incorrectos" />}
      </section>
    </div>
  );
};

export default Form;
