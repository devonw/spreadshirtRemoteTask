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
      status: {
        title: "Welcome!",
        msg: "This is like tinder for T-shirts.",
        style: "success"
      },
      searchHistory: new Map(), // keywords -> [designId]
      designs: new Map(), // design.id -> design
      voteKeywords: ""
    };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.dismissStatus = this.dismissStatus.bind(this);
    this.applyVote = this.applyVote.bind(this);
  }

  triggerSearch(keywords) {
    const searchHistory = this.state.searchHistory;
    if(searchHistory.has(keywords)){
      this.setState({
        appState: AppStates.vote,
        status: {
          title: "Ah!",
          msg: "This search was done before. No server was bothered.",
          style: "info"},
        voteKeywords: keywords
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
          const state = this.state;
          const designs = response.data.designs;
          const newDesigns = new Map(function*(){
            yield* state.designs;
            yield* designs.map(function(d){return [d.id, d];});
          }());
          const designIds = designs.map((d) => {return d.id;});
          const history = (new Map(state.searchHistory)).set(keywords, designIds);
          this.setState({
            appState: AppStates.vote,
            designs: newDesigns,
            searchHistory: history,
            status: {msg: "", title: "", style: ""},
            voteKeywords: keywords
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

  applyVote(designId, vote){
    /*
      cursor will be the index of the current designs to use.
      vote will be in {-1,1}.
    */
    const state = this.state;
    const design = state.designs.get(designId);
    this.setState({
      designs: new Map(
        state.designs,
        [design.id, Object.assign({}, design, {vote: vote})]
      )
    });
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
    const state = this.state;
    const designIds = state.searchHistory.get(state.voteKeywords);
    const voteDesigns = designIds.map((dId) => {
      return state.designs.get(dId);
    });
    return this.renderBase(
      <Vote ref="vote"
            designs={voteDesigns}
            searchButton={() => {this.setState({appState: AppStates.showSearch});}}
            statisticsButton={() => {this.setState({appState: AppStates.statistics});}}
            onVote={this.applyVote}/>
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
