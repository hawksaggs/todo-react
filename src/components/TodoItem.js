import React from "react";

import styles from "./TodoItem.module.scss";

// class component
class TodoItem extends React.Component {
  state = {
    editing: false,
  };
  handleEditing = () => {
    console.log("edit mode activated");
    this.setState({
      editing: true,
    });
  };
  handleEditDone = (event) => {
    if (event.key === "Enter") this.setState({ editing: false });
  };
  render() {
    const completedStyle = {
      fontStyle: "italic",
      color: "#595959",
      opacity: 0.4,
      textDecoration: "line-through",
    };
    const { completed, id, title } = this.props.todo;
    let viewMode = {};
    let editMode = {};
    if (this.state.editing) viewMode.display = "none";
    else editMode.display = "none";

    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => this.props.handleChangeProps(id)}
          />
          <button onClick={() => this.props.deleteTodoProps(id)}>Delete</button>
          <span style={completed ? completedStyle : null}>{title}</span>
        </div>
        <input
          type="text"
          className={styles.textInput}
          style={editMode}
          value={title}
          onChange={(e) => {
            this.props.updateTodoProps(e.target.value, id);
          }}
          onKeyDown={this.handleEditDone}
        />
      </li>
    );
  }
}

// Fuctional component
// function TodoItem(props) {
//   return <li>{props.todo.title}</li>
// }

export default TodoItem;
