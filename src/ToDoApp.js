import React, { Component } from 'react';
import Main from "./Main";
import Footer from "./Footer";
import "./styles/app.scss";

class ToDoApp extends Component {
  render() {
    return (
      <div className="App">
        <Main />
        <Footer />
      </div>
    );
  };
};

export default ToDoApp;