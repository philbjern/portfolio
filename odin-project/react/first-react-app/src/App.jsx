
import './App.css'

function Button({text="Click me!", color="blue", fontSize=12}) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px',
    display: 'block',
    margin: '10px auto'
  }

  return (
    <button style={buttonStyle}>{text}</button>
  )
}

function App() {
  return (
    <div>
      <Button />
      <Button text="Don't click me!" color="red"/>
      <Button fontSize={20}/>
    </div>
  )
}

export default App
