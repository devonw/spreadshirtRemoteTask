/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|imageForDesign|Button|Glyphicon"}]*/
import React, { Component } from "react";
import {Button,
        Glyphicon} from "react-bootstrap";
import {imageForDesign} from "./Vote/Helpers";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: props.designs || [],
      cursor: 0
    };
    this.currentDesign = this.currentDesign.bind(this);
    this.vote = this.vote.bind(this);
  }

  currentDesign(){
    const state = this.state;
    return (state.cursor >= state.designs.length)
         ? {description: "", resources: []}
         : state.designs[state.cursor];
  }

  vote(vote){
    const currentDesign = this.currentDesign();
    this.setState({cursor: this.state.cursor + 1});
    if(this.props.onVote){
      this.props.onVote(currentDesign.id, vote);
    }
  }

  render() {
    const currentDesign = this.currentDesign();
    return (
      <div>
        <img src={imageForDesign(currentDesign)}
             alt={currentDesign.description} />
        <div>
          <Button ref="searchButton" onClick={this.props.searchButton}>
            <Glyphicon glyph="search"/>
          </Button>
          <Button ref="statisticsButton" onClick={this.props.statisticsButton}>
            <Glyphicon glyph="stats"/>
          </Button>
          <Button ref="voteDownButton" bsStyle="danger"
                  onClick={() => {this.vote(-1);}}>
            <Glyphicon glyph="chevron-down"/>
          </Button>
          <Button ref="voteUpButton" bsStyle="success"
                  onClick={() => {this.vote(+1);}}>
            <Glyphicon glyph="chevron-up"/>
          </Button>
        </div>
      </div>
    );
  }
}

export default Vote;
