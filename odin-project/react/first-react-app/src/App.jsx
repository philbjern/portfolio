
import './App.css'
import { useState } from 'react';

function Person() {
  const [person, setPerson] = useState({ firstName: "John", lastName: "Doe", age: 100})

  const handleIncreaseAge = () => {
    console.log("in handleIncreaseAge (before setPerson call): ", person);
    // copy the existing person object into new object
    // while updating age property
    const newPerson = {...person, age: person.age + 1}
    setPerson(newPerson)
    console.log("in handleIncreaseAge (after setPerson call): ", person);
  }

  console.log("during render: ", person)

  return (
    <>
      <h1>{person.firstName} {person.lastName}</h1>
      <h2>{person.age}</h2>
      <div>
        <CustomInput placeholder="first name" item={person.firstName} updateItem={(value) => setPerson({...person, firstName: value})}/>
        <CustomInput placeholder="last name" item={person.lastName} updateItem={(value) => setPerson({...person, lastName: value})}/>
      </div>
      <div>
        <button onClick={handleIncreaseAge}>Increase Age</button>
        <button onClick={() => setPerson({...person, age: 100})}>Reset Age</button>
      </div>
    </>
  )
}

function CustomInput({ placeholder, item, updateItem }) {
  const [value, setValue] = useState(item);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    updateItem(event.target.value)
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
}


const COLORS = ['pink', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [numberOfBackgroundChanges, setNumberOfBackgroundChanges] = useState(0);

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
      <Person />
    </div>
  )
}

export default App
