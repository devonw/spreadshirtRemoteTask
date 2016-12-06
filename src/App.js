/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React"}]*/
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Searchbar from "./Searchbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Spreadshirt Remote Task</h2>
        </div>
        <Searchbar />
      </div>
    );
  }
}

export default App;
