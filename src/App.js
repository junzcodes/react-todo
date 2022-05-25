import React from "react";
import "./App.css";
import { useState } from "react";

function TodoApp() {
  const [tasks, updateTasks] = useState([]);
  const [error, setError] = useState("");
  const addTaskInput = React.createRef();

  const clearTaskInput = () => {
    addTaskInput.current.value = "";
  };

  const clearErrors = () => {
    setError("");
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!addTaskInput.current.value) {
      setError("Task title is required!");
      return;
    }

    if (tasks.includes(addTaskInput.current.value)) {
      setError("Task already exists!");
      return;
    }

    updateTasks([...tasks, addTaskInput.current.value]);

    clearTaskInput();
    clearErrors();
  };

  const removeTask = (e) => {
    const updatedTaskList = tasks.filter((task) => {
      return e.target.value !== task;
    });

    updateTasks(updatedTaskList);
  };

  const Task = (props) => {
    return (
      <input
        className="drop-shadow p-3 my-2 w-full transition-all hover:bg-purple-400 hover:text-white cursor-pointer"
        onClick={removeTask}
        readOnly
        value={props.title}
      />
    );
  };

  const taskList = tasks.map((task, index) => {
    return <Task key={index} title={task} />;
  });

  return (
    <>
      <div className="box-border container p-4 mx-auto">
        <form action="/" onSubmit={addTask} className="flex flex-wrap">
          <input
            className="h-10 border-2 border-purple-500 w-10/12 px-3 mr-2 flex-1 focus:border-purple-500"
            type="text"
            name="addtask"
            ref={addTaskInput}
            placeholder="Task title..."
          />
          <button className="border-2 border-purple-500 text-center text-white font-semibold px-5 md:px-10 bg-purple-500 hover:bg-purple-300 hover:transition">
            Add Task
          </button>
          <span className="block w-full text-red-500 py-2">{error}</span>
        </form>
        <ul>{taskList}</ul>
      </div>
    </>
  );
}

export default TodoApp;
