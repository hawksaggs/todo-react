import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./Header";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

function getInitialTodos() {
  const temp = localStorage.getItem("todos");
  const savedTodos = JSON.parse(temp);
  return savedTodos || [];
}

const TodoContainer = (props) => {
  const [todos, setTodos] = useState(getInitialTodos());

  // useEffect(() => {
  //   console.log("use effect");
  //   //getting the todos items same as componentdidmount
  //   const todoItems = localStorage.getItem("todos");
  //   const loadedTodos = JSON.parse(todoItems);
  //   if (todoItems) {
  //     setTodos(loadedTodos);
  //   }
  // }, []);

  useEffect(() => {
    // storing the todo items same as componentdidupdate
    console.log("use effect 2");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id;
      }),
    ]);
  };

  const addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (title, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) todo.title = title;

        return todo;
      })
    );
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodo} />
        <TodoList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={delTodo}
          updateTodoProps={updateTodo}
        />
      </div>
    </div>
  );
};

export default TodoContainer;
