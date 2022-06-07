import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import About from "../../pages/About";
import NoMatch from "../../pages/NoMatch";

import Header from "./Header";
import InputTodo from "./InputTodo";
import Navbar from "./Navbar";
import TodoList from "./TodoList";

// function getInitialTodos() {
//   const temp = localStorage.getItem("todos");
//   const savedTodos = JSON.parse(temp);
//   return savedTodos || [];
// }

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

const TodoContainer = (props) => {
  useEffect(() => {
    console.log("use effect");
    //getting the todos items same as componentdidmount
    const todoItems = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(todoItems);
    if (todoItems) {
      props.dispatch({ type: "INIT", payload: loadedTodos });
    }
  }, []);

  useEffect(() => {
    // storing the todo items same as componentdidupdate
    console.log("use effect 2");
    localStorage.setItem("todos", JSON.stringify(props.todos));
  }, [props.todos]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo />
              <TodoList todos={props.todos} />
            </div>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </>
  );
};

export default connect(mapStateToProps)(TodoContainer);
