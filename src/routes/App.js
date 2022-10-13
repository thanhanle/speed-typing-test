//import logo from './logo.svg';
//import './App.css';

import React, { useState } from "react";
import { nanoid } from "nanoid";

import AppForm from "../components/AppForm";
import AppFilterButton from "../components/AppFilterButton";
import AppTodo from "../components/AppTodo";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: true }
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(DATA);

  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // const taskList = props.tasks?.map((task) => task.name);
  // const taskList = props.tasks.map((task) => <Todo />);
  // const taskList = props.tasks.map((task) => (
  //   <Todo id={task.id} name={task.name} completed={task.completed} />
  // ));

  // const taskList = tasks.map((task) => (
  //     <Todo
  //       id={task.id}
  //       name={task.name}
  //       completed={task.completed}
  //       key={task.id}
  //       toggleTaskCompleted={toggleTaskCompleted}
  //       deleteTask={deleteTask}
  //       editTask={editTask}
  //     />
  //   )
  // );

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <AppTodo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <AppFilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // const headingText = `${taskList.length} tasks remaining`;
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    // const newTask = { id: "id", name, completed: false };
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  return (
    <div>
      <div className="filters btn-group stack-exception">
        <button
            type="button"
            className="btn toggle-btn"
            onClick={() => props.setComponent(props.Component.SPEEDGAME)}
        >
            Speed Game
        </button>
        <button
            type="button"
            className="btn toggle-btn"
            onClick={() => props.setComponent(props.Component.USERPAGE)}
        >
            User Page
        </button>
        <button
            type="button"
            className="btn"
        >
            App Example
        </button>
      </div>

      <h1>Task List</h1>
      <AppForm addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* <Todo name="Eat" completed={true} id="todo-0" />
        <Todo name="Sleep" completed={false} id="todo-1" />
        <Todo name="Repeat" completed={true} id="todo-2" /> */}
      </ul>
    </div>
  );
}


// function App(props) {
//   const subject = props.subject;
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> Hello {subject} World!
//         </p>
//         {/* <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//       </header>
//     </div>
//   );
// }

export default App;
