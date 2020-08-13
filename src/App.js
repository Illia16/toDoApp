import React, { Component } from 'react';
import List from "./List";
import Footer from "./Footer";
import './App.scss';

class ToDoApp extends Component {
  render() {
    return (
      <div className="App">
        <List />
        <Footer />
      </div>
    );
  }
}

export default ToDoApp;