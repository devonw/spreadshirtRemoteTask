/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Searchbar"}]*/
import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Searchbar";
import AppStates from "./AppStates";
import DesignSearch from "./DesignSearch";
import Vote from "./Vote";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppStates.search,
      currentSearch: null,
      searchHistory: new Map()
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const keywords = this.refs.searchBar.keywords;
    const searchHistory = this.state.searchHistory;
    if(searchHistory.has(keywords)){
      const search = searchHistory.get(keywords);

      this.setState({
        appState: AppStates.vote,
        currentSearch: search
      });
    }else{
      const search = new DesignSearch({
        keywords: keywords,
        searchImmediately: false
      });
      const history = new Map(searchHistory);
      history.set(search.keywords, search);

      this.setState({
        appState: AppStates.vote,
        currentSearch: search,
        searchHistory: history
      });
    }
  }

  render() {
    const searchBar = this.refs.searchBar;

    switch(this.state.appState){
    case AppStates.search:
      if(searchBar && searchBar.state.searchTriggered){
        this.handleSearch();
        return this.render();
      }
      return this.renderSearch();
    case AppStates.vote:
      return this.renderVote();
    case AppStates.statistics:
      // FIXME IMPLEMENT
      return this.renderBase("Statistics intensifies");
    default:
      return this.renderSearch();
    }
  }

  renderSearch() {
    return this.renderBase(
      <Searchbar ref="searchBar" onSearch={() => this.handleSearch()}/>
    );
  }

  renderVote() {
    return this.renderBase(
      <Vote ref="vote" search={this.state.currentSearch}/>
    );
  }

  renderBase(content) {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spreadshirt Remote Task</h2>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
