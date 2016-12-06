/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Searchbar"}]*/
import React from "react";
import ReactDOM from "react-dom";
import Searchbar from "./Searchbar";

/* global it:true */
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Searchbar />, div);
});
