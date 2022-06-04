import React, { useState } from "react";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      props.addTodoProps(inputText.title);
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
      <button className="input-submit">Submit</button>
    </form>
  );
};

export default InputTodo;
