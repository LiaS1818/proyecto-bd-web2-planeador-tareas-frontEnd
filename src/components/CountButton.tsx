import { useState } from "react"; 

function CountButton () {
  const [count, setCount] = useState(0)

  const handleOnClick = () => {
    setCount(count + 1)
  }

  return(
    <button onClick={handleOnClick}>
      count is {count}
    </button>
  )
}

export default CountButton