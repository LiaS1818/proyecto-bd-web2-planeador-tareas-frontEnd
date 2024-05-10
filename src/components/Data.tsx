export type DataProps = {
  password: string,
  email: string,
  showData: boolean
}
// El estado es interno del componente, mientras que las props se mandan de fuera


function Data({password, email, showData}: DataProps) {
  return(
    
    <section className="dataContainer">
    {
      showData && ( //si es true, pasa y hace la funcion, si no, se la brinca
        <>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        
      </>
      )
      

    //renderice lo que se capturo en el formulario
}
    </section>
  )
}

export default Data