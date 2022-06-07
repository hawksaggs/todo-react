import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { connect } from "react-redux";

import styles from "./TodoItem.module.scss";

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    return () => {
      console.log("Cleaning up...");
    };
  }, []);

  const handleEditing = () => {
    console.log("edit mode activated");
    setEditing(true);
  };

  const handleEditDone = (event) => {
    if (event.key === "Enter") setEditing(false);
  };

  const delTodo = (id) => {
    props.dispatch({ type: "DELETE", payload: { id } });
  };

  const updateTodo = (title, id) => {
    props.dispatch({ type: "UPDATE", payload: { title, id } });
  };

  const handleChange = (id) => {
    props.dispatch({ type: "COMPLETE", payload: { id } });
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title } = props.todo;

  let viewMode = {};
  let editMode = {};

  if (editing) viewMode.display = "none";
  else editMode.display = "none";

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => handleChange(id)}
        />
        <button onClick={() => delTodo(id)}>
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type="text"
        className={styles.textInput}
        style={editMode}
        value={title}
        onChange={(e) => {
          updateTodo(e.target.value, id);
        }}
        onKeyDown={handleEditDone}
      />
    </li>
  );
};

export default connect(mapStateToProps)(TodoItem);
