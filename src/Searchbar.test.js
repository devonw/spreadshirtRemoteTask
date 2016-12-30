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

it("should adjust keywords and trigger onSearch correctly", () => {
  const handleSearch = jest.fn();

  const searchBar = ReactTestUtils.renderIntoDocument(
    <Searchbar onSearch={handleSearch}/>
  );
  expect(searchBar.state.keywords).toBe("");

  const button = ReactDOM.findDOMNode(searchBar.refs.searchButton);
  const input = ReactDOM.findDOMNode(searchBar.refs.searchInput);

  ReactTestUtils.Simulate.change(input, {target: {value: "test"}});

  ReactTestUtils.Simulate.click(button);
  expect(handleSearch).toHaveBeenCalledWith("test");
});
