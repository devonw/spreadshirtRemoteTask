/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Vote"}]*/
import React from "react";
import ReactDOM from "react-dom";
import Vote from "./Vote";

/* global it:true */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Vote />, div);
});
