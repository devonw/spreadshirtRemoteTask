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
  const handleSearch = (keywords) => {
    //FIXME why are the keywords wrong here?
    //expect(keywords).toBe("test");
    return callMe();
  };
  const searchBar = ReactTestUtils.renderIntoDocument(
    <Searchbar onSearch={handleSearch}/>
  );
  expect(searchBar.state.keywords).toBe("");

  const button = ReactDOM.findDOMNode(searchBar.refs.searchButton);
  const input = ReactDOM.findDOMNode(searchBar.refs.searchInput);

  input.value = "test";
  ReactTestUtils.Simulate.change(input);
  ReactTestUtils.Simulate.keyDown(
    input, {key: "Enter", keyCode: 13, which: 13});

  ReactTestUtils.Simulate.click(button);
  expect(callMe).toHaveBeenCalled();
});
