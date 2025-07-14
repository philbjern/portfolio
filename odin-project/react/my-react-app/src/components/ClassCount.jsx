import { Component } from "react";

class ClassCount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        There are <b>{this.props.taskCount}</b> current tasks
      </div>
    )
  }
}

export default ClassCount;