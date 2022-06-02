import React from "react";
import TodoItem from "./TodoItem";

class TodoList extends React.Component {
  render() {
    //   console.log(this);
    return (
      <ul>
        {this.props.todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleChangeProps={this.props.handleChangeProps}
              deleteTodoProps={this.props.deleteTodoProps}
              updateTodoProps={this.props.updateTodoProps}
            />
          );
        })}
      </ul>
    );
  }
}

export default TodoList;
