export const SearchStates = {
  pending: Symbol("Pending"),
  fail: Symbol("Failed"),
  success: Symbol("Success")
};

class DesignSearch {
  constructor(settings) {
    //Default attributes:
    this.keywords = "";
    this.searchState = SearchStates.pending;
    this.searchResults = []; // Filled when search succeeds
    this.searchErrorMsg = ""; // Filled when search failes
    this.shopId = "205909"; // Given trough task description
    this.searchImmediately = true;
    //Apply settings:
    Object.assign(this, settings || {});
    //Trigger search if desired:
    if(this.searchImmediately) {
      this.search();
    }
  }

  searchBaseUrl() {
    return `http://api.spreadshirt.com/api/v1/shops/${this.shopId}/designs`;
  }

  search() {
    //FIXME IMPLEMENT
  }

}

export default DesignSearch;
