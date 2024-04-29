import { useState } from "react"
import "../Form.css"

function Form() {
const [name, setName] = useState<string>("");
const hola = "Hola esta no es mi familia"
const handleOnNameChange = (event) => {
  setName(hola)
}

  return(
    <>
    <section className="dataContainer">
    {
    //renderice lo que se capturo en el formulario
    }
    </section>
    <section className="formContainer">
      <span className="inputContainer">
        <label className="" htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleOnNameChange} />
      </span>

      <span className="inputContainer">
        <label htmlFor="email">Email:</label>
        <input type="email" />
      </span>
    </section>
    
    </>

  )
}

export default Form