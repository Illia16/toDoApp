import React, { Component } from 'react';
import List from "./List";
import './App.css';

class ToDoApp extends Component {
  render() {
    return (
      <div className="App">
        <h1>To do</h1>
        <List />
      </div>
    );
  }
}

export default ToDoApp;