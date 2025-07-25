import { useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div>
      <h1>Hello from the main page of the app!</h1>
      <p>Here are some examples of links to other pages</p>
      <nav>
        <ul>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default App
