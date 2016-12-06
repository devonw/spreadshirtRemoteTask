/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|App"}]*/
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* global it:true */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
