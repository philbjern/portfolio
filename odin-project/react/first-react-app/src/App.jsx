
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
  const [numberOfBackgroundChanges, setNumberOfBackgroundChanges] = useState(0);

  const handleButtonClick = (url) => {
    window.location.href = url;
  }

  const updateNumberOfBackgroundChanges = () => {
    setNumberOfBackgroundChanges(numberOfBackgroundChanges + 1);
  }

  const resetNumberOfBgChanges = () => {
    setNumberOfBackgroundChanges(0);
  }

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    updateNumberOfBackgroundChanges();
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
      <div>
          Number of background changes: {numberOfBackgroundChanges}
          
      </div>
      <button onClick={resetNumberOfBgChanges}>Reset</button>
    </div>
  )
}

export default App
