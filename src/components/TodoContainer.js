import React from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./Header";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

class TodoContainer extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Setup development environment",
        completed: true,
      },
      {
        id: 2,
        title: "Develop website and add content",
        completed: false,
      },
      {
        id: 3,
        title: "Deploy to live server",
        completed: false,
      },
    ],
  };

  handleChange = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));

    // //another way to implement the above
    // this.setState((prevState) => {
    //   return {
    //     todos: prevState.todos.map((todo) => {
    //       if (todo.id === id) {
    //         return {
    //           ...todo,
    //           completed: !todo.completed,
    //         };
    //       }
    //       return todo;
    //     }),
    //   };
    // });
  };

  delTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => {
        return todo.id !== id;
      }),
    }));
  };

  // delTodo = (id) => {
  //   this.setState({
  //     todos: [
  //       ...this.state.todos.filter((todo) => {
  //         return todo.id !== id;
  //       }),
  //     ],
  //   });
  // };

  addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  updateTodo = (title, id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) todo.title = title;

        return todo;
      }),
    });
  };

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            updateTodoProps={this.updateTodo}
          />
        </div>
      </div>
    );
  }
}

export default TodoContainer;
