
import './App.css'

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

function App() {
  const handleButtonClick = (url) => {
    window.location.href = url;
  }

  return (
    <div>
      <Button />
      <Button text="Don't click me!" color="red"/>
      <Button handleClick={() => handleButtonClick("https://www.google.com")} fontSize={20}/>
    </div>
  )
}

export default App
