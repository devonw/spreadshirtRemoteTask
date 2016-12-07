/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React"}]*/
import React, { Component } from "react";

const exampleImage = "https://image.spreadshirtmedia.com/image-server/v1/designs/2104687";

class Vote extends Component {
  constructor(props) {
    super(props);
    //We expect props to contain `search`.
    this.searchEnded = this.searchEnded.bind(this);
  }

  searchEnded() {

  }

  render() {
    return (
      <img src={exampleImage} />
    );
  }
}

export default Vote;
