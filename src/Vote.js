/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React"}]*/
import React, { Component } from "react";
import SearchStates from "./SearchStates";

const exampleImage = "https://image.spreadshirtmedia.com/image-server/v1/designs/2104687";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: [],
      error: ""
    };
    //We expect props to contain `search`.
    this.searchEnded = this.searchEnded.bind(this);

    if(props.search.searchState === SearchStates.pending){
      props.search.callback = this.searchEnded;
      props.search.search();
    }
  }

  searchEnded() {
    switch(this.props.search.searchState){
    case SearchStates.succees:
      this.setState({designs: this.props.search.designs});
      break;
    case SearchStates.fail:
    default:
      this.setState({error: this.props.search.searchErrorMsg});
    }
  }

  render() {
    return (
      <img src={exampleImage} alt="Heart with rainbow." />
    );
  }
}

export default Vote;
