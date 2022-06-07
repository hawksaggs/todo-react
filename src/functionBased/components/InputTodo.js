import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
  });

  const addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    props.dispatch({ type: "ADD", payload: newTodo });
  };

  const handleChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      addTodo(inputText.title);
      setInputText({
        title: "",
      });
    } else {
      alert("Please item something to do");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title"
        onChange={handleChange}
      />
      <button className="input-submit">
        <FaPlusCircle
          style={{ color: "darkcyan", fontSize: "20px", marginTop: "2px" }}
        />
      </button>
    </form>
  );
};

export default connect(mapStateToProps)(InputTodo);
