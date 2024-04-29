export type HeaderProps = {
  title: string;
}

function Header({title}: HeaderProps){
  //props.titles

  return(
    <header>
      Mi Aplicacion
      {title}
    </header>
  )
}


export default Header