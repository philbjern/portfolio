/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import ClassCount  from './ClassCount'

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTaskList = this.renderTaskList.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDeleteTask(task) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo !== task),
    }))
  }

  renderTaskList(todos) {
    return todos.map((todo) => (
      <li key={todo}>{todo} <button onClick={() => this.handleDeleteTask(todo)}>Delete</button></li>
    ));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        <ClassCount taskCount={this.state.todos.length}/>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.length > 0 ? this.renderTaskList(this.state.todos) : <li>No tasks yet</li>}
        </ul>
      </section>
    );
  }
}

export default ClassInput;


// Class component assignment

// The goal of this assignment is to do the following:

//     Implement a delete button for each task.The delete button should remove that specific task from the state array, thus deleting the task itself! Styling isn't a priority at this moment, but the button tag should be styled by default.

//     Implement a new class component, Count that displays the count of the number of todos, at any given time.

//     Implement an edit button for each task.It should replace the todo with an input field, and change the button itself to 'Resubmit', so the edits can be saved.This is a comparatively harder task, kudos for when you finish it!
