
import './App.css'
import { useState } from 'react';

function Button({text="Click me!", color="blue", fontSize=12, handleClick}) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px',
    display: 'block',
    margin: '10px auto'
  }

  return (
    <button style={buttonStyle} onClick={handleClick}>{text}</button>
  )
}

const COLORS = ['pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);

  const handleButtonClick = (url) => {
    window.location.href = url;
  }

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
  }

  return (
    <div className="App" style={{backgroundColor}}>
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? 'selected' : ''}
          >
            {color}
        </button>
      ))}
    </div>
  )
}

export default App
