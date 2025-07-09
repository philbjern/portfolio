import { useState } from 'react'

import Clock from './Clock'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Clock />
      </div>
    </>
  )
}

export default App
