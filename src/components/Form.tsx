import { useState, useEffect } from "react"
import Data from "./Data"; 
import Task from "./Task";
import Error from "./Error";
import "../Form.css"
import { set } from "mongoose";

const API_URL = 'http://localhost:3010/';

const loginData = {
  email: 'sorgoroto@gmail.com',
  password: '1234'
}

function Form() {
  //input controlado: tiene asignado una variable de cambio y su input esta asignado a una funcion
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [showData, setShowData] = useState<boolean>(false)
const [loginError, setLoginError] = useState<boolean>(false)
const [user, setUser] = useState<any>(null)
const [userTasks, setUserTasks] = useState<any[]>([])
useEffect(() => {
  const userInStorageString = window.localStorage.getItem("user")
  const userInStorage = JSON.parse(userInStorageString)
  setUser(userInStorage)
}, []
);
// patron de diseño Curry | Curried function
const handleOnInputChange = (stateUpdate) => {
  return (event) => {
    stateUpdate(event.target.value)
  }
}
const logIn = async ({email, password}: {email: string, password: string}) => {
  try{
    const response = await fetch(`${API_URL}api/v1/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.status === 200 ){
      const data = await response.json();
      console.log(data)
      setUser(data);

      window.localStorage.setItem("user", JSON.stringify(data))
      loginData.email = data.user.email
      loginData.password = data.user.password
      setLoginError(false)
      setShowData(true)
      fetchCategory()
      
    }else{
      setLoginError(true);
      setShowData(false);
    }
  
  }catch(error){
    console.error(error)
  }
}

const fetchCategory = async () => {
  try{
    const response = await fetch (`${API_URL}api/v1/task`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const data = await response.json()
    setUserTasks(data)
  }catch(error){
    console.log(error)  
  }
}
const handleOnClick = () => {
  
  if(email === loginData.email && password === loginData.password){
    setShowData(true);
    setLoginError(false);
  }else{
    logIn({email, password})
    setShowData(false);
    setLoginError(true);
  }

  setEmail("")
  setPassword("")
  //toggle the flag
}

return(
  <>
    {
      user && (
        <section className="dataContainer">
        {
      //si es true, pasa y hace la funcion, si no, se la brinca
          <>
          <p>Name: {user.user.name}</p>
          <p>Email: {user.user.email}</p>  
          </>
    //renderice lo que se capturo en el formulario
        }
        </section>
      )
    }
    {showData && <Task tasks={userTasks} />} {/* Renderiza el componente de tareas con las tareas del usuario */}
    <section className="formContainer">
        <span className="inputContainer">
          <label className="" htmlFor="name">Email:</label>
          <input type="email" id="email" name="email" value={email}  onChange={handleOnInputChange(setEmail)}/>
        </span>

        <span className="inputContainer">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handleOnInputChange(setPassword)}/>
        </span>
        <button onClick={handleOnClick}> Iniciar Sesión
        </button>
      </section>
      {loginError && <Error message="Usuario o contraseña incorrectos" /> }
    </>
  );
}

export default Form