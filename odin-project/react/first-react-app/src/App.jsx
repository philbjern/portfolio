
import './App.css'

function Button(props) {
  const buttonStyle = {
    color: props.color,
    fontSize: props.fontSize + 'px',
    display: 'block',
    margin: '10px auto'
  }

  return (
    <button style={buttonStyle}>{props.text}</button>
  )
}

function App() {
  return (
    <div>
      <Button text="Click me!" color="blue" fontSize={12}/>
      <Button text="Don't click me!" color="red" fontSize={12}/>
      <Button text="Click me!" color="blue" fontSize={20}/>
    </div>
  )
}

export default App
