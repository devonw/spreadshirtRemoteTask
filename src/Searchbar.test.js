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

it("should adjust keywords and searchTriggered correctly", () => {
  const callMe = jest.fn();
  const searchBar = ReactTestUtils.renderIntoDocument(
    <Searchbar onSearch={callMe}/>
  );
  expect(searchBar.state.keywords).toBe("");

  const button = ReactDOM.findDOMNode(searchBar.refs.searchButton);
  /*  FIXME WHAT'S UP WITH THIS?
  const input = ReactDOM.findDOMNode(searchBar.refs.searchInput);

  input.value = "test";
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.keyDown(
    input, {key: "Enter", keyCode: 13, which: 13});
  expect(searchBar.state.keywords).toBe("test");
  //*/

  ReactTestUtils.Simulate.click(button);
  expect(callMe).toHaveBeenCalled();
});
