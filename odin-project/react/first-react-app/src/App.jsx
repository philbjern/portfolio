import './App.css'

function ListItem(props) {
  return <li key={props.animal}>{props.animal}</li>
}

function List(props) {
  return (
    <ul>
      {props.animals.map((animal) => {
        return <ListItem key={animal} animal={animal} />
      })}
    </ul>
  )
}

function App() {
  const animals = ["Cow", "Lion", "Snake", "Lizard"];
  return (
    <>
      <h1>Animals:</h1>
      <ul>
        <List animals={animals} />
      </ul>
    </>
  )
}

export default App
