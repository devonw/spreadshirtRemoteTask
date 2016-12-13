/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|imageForDesign"}]*/
import React, { Component } from "react";
import {exampleImage, imageForDesign} from "./Vote/Helpers";

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
    if(state.cursor >= state.designs.length){
      return (
        <img src={exampleImage} alt="Heart with rainbow." />
      );
    }
    const currentDesign = state.designs[state.cursor];
    return (
      <img src={imageForDesign(currentDesign)}
           alt={currentDesign.description} />
    );
  }
}

export default Vote;
