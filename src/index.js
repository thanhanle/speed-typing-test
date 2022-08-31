import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './routes/App';
//import reportWebVitals from './reportWebVitals';
import Main from './routes/Main';

// const DATA = [
//     { id: "todo-0", name: "Eat", completed: true },
//     { id: "todo-1", name: "Sleep", completed: false },
//     { id: "todo-2", name: "Repeat", completed: true }
// ];

//ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));
ReactDOM.render(<Main/>, document.getElementById('root'));

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App subject="Anders" />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
