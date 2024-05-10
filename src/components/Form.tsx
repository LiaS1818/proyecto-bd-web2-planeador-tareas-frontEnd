import { useState, useEffect } from "react"
import Data from "./Data"; 
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

useEffect(() => {
  if (email.includes("ñ")) {
    console.log("tiene Ñ >:(")
  }
}, [email]
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
      
    }else{
      setLoginError(true);
      setShowData(false);
    }
  
  }catch(error){
    console.error(error)
  }
}
const handleOnClick = () => {
  
  if(email === loginData.email && password === loginData.password){
    setShowData(true);
    setLoginError(false);
  }else{
    
    setShowData(false);
    setLoginError(true);
  }

  setEmail("")
  setPassword("")
  //toggle the flag
}

  return(
    <>
      
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
      {showData && <Data email={loginData.email} password={loginData.password} showData={showData} ></Data> }
    </>
  );
}

export default Form