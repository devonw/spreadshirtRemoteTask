import DesignSearch from "./DesignSearch";
import SearchStates from "./SearchStates";

/* global it:true expect: true */
it("must have the shopId in its searchBaseUrl", () => {
  const search = new DesignSearch({searchImmediately: false});
  expect(search.searchBaseUrl()).toMatch(/shops\/205909\/designs/);
});

it("must start with a pending search", () => {
  const search = new DesignSearch({searchImmediately: false});
  expect(search.searchState).toBe(SearchStates.pending);
});
