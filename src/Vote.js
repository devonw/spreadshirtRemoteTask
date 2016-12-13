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
  }

  render() {
    const state = this.state;
    const currentDesign = (state.cursor >= state.designs.length)
                        ? {description: "", resources: []}
                        : state.designs[state.cursor];
    return (
      <div>
        <div>
          <Button ref="searchButton" onClick={this.props.searchButton}>
            <Glyphicon glyph="search"/>
          </Button>
          <Button ref="statisticsButton" onClick={this.props.statisticsButton}>
            <Glyphicon glyph="stats"/>
          </Button>
        </div>
        <img src={imageForDesign(currentDesign)}
             alt={currentDesign.description} />
      </div>
    );
  }
}

export default Vote;
