/* global it:true expect:true jest:true*/
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Searchbar"}]*/
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import Searchbar from "./Searchbar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Searchbar />, div);
});

it("should have a working searchKeywords callback", () => {
  const callMe = jest.fn();

  const searchBar = ReactTestUtils.renderIntoDocument(
    <Searchbar searchKeywords={callMe}/>
  );
  const button = ReactDOM.findDOMNode(searchBar.refs.searchButton);

  ReactTestUtils.Simulate.click(button);
  expect(callMe).toHaveBeenCalled();
});
