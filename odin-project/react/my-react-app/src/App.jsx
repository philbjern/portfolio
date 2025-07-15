import { useState } from 'react'

import Clock from './Clock'

import FunctionalInput from './components/FunctionalInput'
import ClassInput from './components/ClassInput'

import './App.css'
import './styles/Input.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <FunctionalInput name="Functional component!" />
//         <div className="divider" />
//         <ClassInput name="Class based component!" />
//       </div>
//     </>
//   )
// }

const App = () => {
  const [heading, setHeading] = useState('Magnificent Monkeys');

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  }

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  )

}

export default App
