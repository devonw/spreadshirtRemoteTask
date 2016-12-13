/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|StatusMessage"}]*/
import React from "react";
import ReactDOM from "react-dom";
import StatusMessage from "./StatusMessage";

/* global it:true */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<StatusMessage />, div);
  ReactDOM.render(<StatusMessage msg="test" onclick={() => {}}/>, div);
});
