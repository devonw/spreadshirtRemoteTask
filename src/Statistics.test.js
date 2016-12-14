/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Statistics"}]*/
import React from "react";
import ReactDOM from "react-dom";
import Statistics from "./Statistics";

/* global it:true */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Statistics />, div);
});
