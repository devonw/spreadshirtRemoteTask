/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Searchbar|Vote|StatusMessage"}]*/
import React, { Component } from "react";
import "./App.css";
import AppStates from "./AppStates";
import Searchbar from "./Searchbar";
import SearchStates from "./SearchStates";
import DesignSearch from "./DesignSearch";
import Vote from "./Vote";
import StatusMessage from "./StatusMessage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppStates.showSearch,
      designs: [],
      statusMessage: "",
      searchHistory: new Map() // keywords -> designs
    };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.dismissStatus = this.dismissStatus.bind(this);
  }

  triggerSearch() {
    const keywords = this.refs.searchBar.keywords;
    const searchHistory = this.state.searchHistory;
    if(searchHistory.has(keywords)){
      this.setState({
        appState: AppStates.vote,
        designs: searchHistory.get(keywords)
      });
    }else{
      const search = new DesignSearch({
        keywords: keywords,
        callback: () => {
          switch(search.searchState){
          case SearchStates.success:
            var history = new Map(this.state.searchHistory);
            history.set(keywords, search.designs);
            this.setState({
              appState: AppStates.vote,
              designs: search.designs,
              searchHistory: history
            });
            break;
          case SearchStates.fail:
            this.setState({
              appState: AppStates.showSearch,
              statusMessage: search.searchErrorMsg
            });
            break;
          default:
            this.setState({
              appState: AppStates.showSearch,
              statusMessage: "Sorry, an unexpected problem occured during search."
            });
          }
        }
      });
      this.setState({appState: AppStates.searching});
    }
  }

  dismissStatus() {
    this.setState({statusMessage: ""});
  }

  render() {
    switch(this.state.appState){
    case AppStates.searching:
      // FIXME IMPLEMENT
      return this.renderBase("Searching intensifies");
    case AppStates.vote:
      return this.renderVote();
    case AppStates.statistics:
      // FIXME IMPLEMENT
      return this.renderBase("Statistics intensifies");
    case AppStates.showSearch:
    default:
      return this.renderSearch();
    }
  }

  renderSearch() {
    return this.renderBase(
      <Searchbar ref="searchBar" onSearch={this.triggerSearch}/>
    );
  }

  renderVote() {
    return this.renderBase(
      <Vote ref="vote" designs={this.state.designs}/>
    );
  }

  renderBase(content) {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spreadshirt Remote Task</h2>
        </div>
        <StatusMessage msg={this.state.statusMessage} onclick={this.dismissStatus}/>
        {content}
      </div>
    );
  }
}

export default App;
