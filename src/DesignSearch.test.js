/* global it:true expect: true */
import DesignSearch from "./DesignSearch";
import SearchStates from "./SearchStates";

const mkSimpleSearch = () => {
  return new DesignSearch({
    keywords: "Heart"
  });
};

it("must have the shopId in its searchBaseUrl", () => {
  const search = mkSimpleSearch();
  expect(search.searchBaseUrl()).toMatch(/shops\/205909\/designs/);
});

it("must start with a pending search", () => {
  const search = mkSimpleSearch();
  expect(search.searchState).toBe(SearchStates.pending);
});

it("must use the callback after search is called", () => {
  const search = mkSimpleSearch();
  search.callback = () => {
    expect(search.searchState).not.toBe(SearchStates.pending);
  };
  return search.search();
});

it("must set searchState to success after searchSuccess", () => {
  const search = mkSimpleSearch();
  search.searchSuccess({data: {designs: ["foo"]}});
  expect(search.searchState).toBe(SearchStates.success);
  expect(search.designs).toEqual(["foo"]);
});

it("must set searchState to fail after searchError", () => {
  const search = mkSimpleSearch();
  const errorMsg = "Failed because of test.";
  search.searchError(errorMsg);
  expect(search.searchState).toBe(SearchStates.fail);
  expect(search.searchErrorMsg).toBe(errorMsg);
});
