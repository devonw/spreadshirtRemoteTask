/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Searchbar|Vote|StatusMessage"}]*/
import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import AppStates from "./AppStates";
import Searchbar from "./Searchbar";
import Vote from "./Vote";
import StatusMessage from "./StatusMessage";

const shopId = "205909"; // Given trough task description

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppStates.showSearch,
      designs: [],
      status: {
        title: "Welcome!",
        msg: "This is like tinder for T-shirts.",
        style: "success"
      },
      searchHistory: new Map() // keywords -> designs
    };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.dismissStatus = this.dismissStatus.bind(this);
  }

  triggerSearch(keywords) {
    const searchHistory = this.state.searchHistory;
    if(searchHistory.has(keywords)){
      this.setState({
        appState: AppStates.vote,
        designs: searchHistory.get(keywords)
      });
    }else{
      const searchConfig = {
        params: {
          query: keywords,
          mediaType: "json",
          spellcheck: true,
          fullData: true,
          offset: 0,
          limit: 50
        }
      };
      axios.get(`/api/v1/shops/${shopId}/designs`, searchConfig).then(
        (response) => {
          const designs = response.data.designs;
          var history = new Map(this.state.searchHistory);
          history.set(keywords, designs);
          this.setState({
            appState: AppStates.vote,
            designs: designs,
            searchHistory: history
          });
        },
        (error) => {
          this.setState({status: {
            title: "Error during search:",
            msg: error.message,
            style: "danger"
          }});
        }
      );
      //*/
      this.setState({appState: AppStates.searching});
    }
  }

  dismissStatus() {
    this.setState({status: {msg: "", title: "", style: ""}});
  }

  render() {
    switch(this.state.appState){
    case AppStates.searching:
      return this.renderBase("Searching…");
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
      <Vote ref="vote"
            designs={this.state.designs}
            searchButton={() => {this.setState({appState: AppStates.showSearch});}}
            statisticsButton={() => {this.setState({appState: AppStates.statistics});}}/>
    );
  }

  renderBase(content) {
    const state = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spreadshirt Remote Task</h2>
        </div>
        <StatusMessage title={state.status.title}
                       msg={state.status.msg}
                       style={state.status.style}
                       onClick={this.dismissStatus}/>
        {content}
      </div>
    );
  }
}

export default App;
