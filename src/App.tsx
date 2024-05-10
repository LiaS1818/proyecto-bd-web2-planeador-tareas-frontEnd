import CountButton from './components/CountButton'
import Header from './components/Header'
import './App.css'
import Form from './components/Form'
function App() {
  //const [count, setCount] = useState(0) //esto es un huc | variables de estado, para poder actualizar el estado

  return ( //siempre un componente retorna algo
    <>
      <Header title="Main page" subtitle="esto es un subtitulo"/> 
      
      <Form />
      <CountButton></CountButton>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </>
  )
}

export default App
