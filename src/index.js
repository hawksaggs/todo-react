import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

//component file
import TodoContainer from "./functionBased/components/TodoContainer";
//stylesheet
import "./functionBased/App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  todos: [],
};

function reducer(state = initialState, action) {
  console.log("store", state, action);
  switch (action.type) {
    case "INIT":
      return {
        todos: [...state.todos, ...action.payload],
      };
    case "ADD":
      return {
        todos: [...state.todos, action.payload],
      };
    case "UPDATE": {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
        }
        return todo;
      });
      return { todos };
    }
    case "DELETE": {
      const todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      return { todos };
    }
    case "COMPLETE": {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) todo.completed = !todo.completed;
        return todo;
      });

      return { todos };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);
console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <TodoContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
