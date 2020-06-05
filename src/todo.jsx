import React, { useState, useRef, useEffect } from "react";
import "./todo.css";

let idx = Date.now();

function Control(props) {
  const { addtodo } = props;
  const inputRef = useRef();

  const onsubmit = e => {
    e.preventDefault();
    let textValue = inputRef.current.value.trim();

    if (textValue.length === 0) {
      return null;
    }

    addtodo({
      id: ++idx,
      text: textValue,
      completed: false
    });

    inputRef.current.value = "";
  };

  return (
    <div>
      添加待办事项
      <form onSubmit={onsubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="what is need to be down"
        />
      </form>
    </div>
  );
}

function Todo(props) {
  let { removetodo, todos, toggletodo } = props;
  return (
    <div>
      <ul className="ul-css">
        {todos.map(item => {
          return (
            <li key={item.id}>
              <input
                value={item.completed}
                type="checkbox"
                onChange={() => toggletodo(item.id)}
              />
              <span className={item.completed ? "completed" : ""}>
                {item.text}
              </span>
              <button onClick={() => removetodo(item.id)}>删除按钮</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function todosDemo() {
  const [todos, setTodos] = useState([]);

  const addtodo = todo => {
    setTodos(todos => [...todos, todo]);
  };

  const removetodo = id => {
    setTodos(todos =>
      todos.filter(todoItem => {
        return todoItem.id !== id;
      })
    );
  };

  const toggletodo = id => {
    setTodos(todos =>
      todos.map(todoItem => {
        return todoItem.id === id
          ? {
              ...todoItem,
              completed: !todoItem.completed
            }
          : todoItem;
      })
    );
  };
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("todoData"));
    setTodos(temp);
    console.log(temp);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos || []));
    console.log(localStorage.getItem("todoData"));
  }, [todos]);

  return (
    <div className="todo-container">
      <Control addtodo={addtodo} />
      <Todo removetodo={removetodo} toggletodo={toggletodo} todos={todos} />
      <h1>asd</h1>
    </div>
  );
}
