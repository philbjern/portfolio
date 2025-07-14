import React, { useState } from 'react';
import FunctionalCount from './FunctionalCount';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */

  const initialTasks = [
    {
      id: 1,
      task: 'Just some demo task',
      isEdit: false,
      isCompleted: false,
    },
    {
      id: 2,
      task: 'As an example',
      isEdit: false,
      isCompleted: false,
    }
  ]

  const [todos, setTodos] = useState(initialTasks);
  const [inputVal, setInputVal] = useState('');

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (inputVal !== '') {
      const newTask = {
        id: `${inputVal}-${todos.length + 1}-${new Date().getTime()}}`,
        task: inputVal,
        isEdit: false,
        isCompleted: false,
      }
      setTodos((todo) => [...todo, newTask]);
      setInputVal('');
    } else if (anyEdited()) {
      setTodos((todo) => todo.map((todo) => {
        if (todo.isEdit) {
          return {
            ...todo,
            isEdit: false,
          }
        }
        return todo;
      }))
    }
  };
  
  const deleteTodo = (todoId) => {
    setTodos((todo) => todo.filter((todo) => todo.id !== todoId))
  }

  const editTodo = (todoId) => {
    setTodos((todo) => todo.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isEdit: !todo.isEdit,
        }
      }
      return todo;
    }))
  }

  const updateTask = (todoId, newTaskValue) => {
    setTodos((todo) => todo.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          task: newTaskValue,
        }
      }
      return todo;
    }))
  }

  const anyEdited = () => {
    return todos.some((todo) => todo.isEdit)
  }


  const resubmit = () => {

  }

  const renderTaskList = (todos) => {
    return todos.map((todo) => {
      return(
        <div key={todo.id} className="task-container">
          <div className="task-text">
            {todo.isEdit ? <input type="text" value={todo.task} onChange={(e) => updateTask(todo.id, e.target.value)}/> : todo.task}

          </div>
          <div className="task-controls">
            <button onClick={() => editTodo(todo.id)}>Edit</button> 
            <button onClick={() => deleteTodo(todo.id)}>Complete</button>
          </div>
        </div>
      )
    })
  }


  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <FunctionalCount taskCount={todos.length}/>
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">{anyEdited() ? 'Resubmit' : 'Submit'}</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.length > 0 ? renderTaskList(todos) : <li>No tasks yet</li>}
      </ul>
    </section>
  );
};

export default FunctionalInput;
