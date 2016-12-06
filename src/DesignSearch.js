import SearchStates from "./SearchStates";
import axios from "../node_modules/axios/index";

class DesignSearch {
  constructor(settings) {
    //Default attributes:
    this.keywords = "";
    this.shopId = "205909"; // Given trough task description
    this.offset = 0;
    this.limit = 50;
    this.searchImmediately = true;
    this.callback = null; // Where we say hello in case of search updates
    //Apply settings:
    Object.assign(this, settings || {});
    //Handled by DesignSearch:
    this.searchState = SearchStates.pending;
    this.searchErrorMsg = null; // Filled when search fails
    this.designs = []; // Filled when search succeeds
    //Bind this context:
    this.searchSuccess = this.searchSuccess.bind(this);
    this.searchError = this.searchError.bind(this);
    this.notifyCallback = this.notifyCallback.bind(this);
    //Trigger search if desired:
    if(this.searchImmediately) {
      this.search();
    }
  }

  searchBaseUrl() {
    return `http://api.spreadshirt.com/api/v1/shops/${this.shopId}/designs`;
  }

  search() {
    const config = {
      params: {
        query: this.keywords,
        mediaType: "json",
        spellcheck: true,
        fullData: true,
        offset: this.offset,
        limit: this.limit
      }
    };
    return axios.get(this.searchBaseUrl(), config)
         .then(this.searchSuccess, this.searchError)
         .then(this.notifyCallback);
  }

  searchSuccess(response) {
    this.searchState = SearchStates.success;
    this.designs = response.data.designs;
  }

  searchError(error) {
    this.searchState = SearchStates.fail;
    this.searchErrorMsg = error;
  }

  notifyCallback() {
    if(this.callback) {
      this.callback(this);
    }
  }
}

export default DesignSearch;
