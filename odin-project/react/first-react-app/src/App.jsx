import './App.css'

function ListItem(props) {
  return <li key={props.animal}>{props.animal}</li>
}

function List(props) {
  if (!props.animals) {
    return <div>Loading...</div>
  }

  if (props.animals.length === 0) {
    return <div>There are no animals in the list!</div>
  }

  return (
    <ul>
      {props.animals.map((animal) => {
        return <li key={animal}>{animal}</li>;
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
