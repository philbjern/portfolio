import { useState } from 'react'

import Clock from './Clock'

import FunctionalInput from './components/FunctionalInput'
import ClassInput from './components/ClassInput'

import './App.css'
import './styles/Input.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <FunctionalInput name="Functional component!" />
        <div className="divider" />
        <ClassInput name="Class based component!" />
      </div>
    </>
  )
}

export default App
