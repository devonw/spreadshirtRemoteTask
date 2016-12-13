/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React"}]*/
import React, { Component } from "react";

const exampleImage = "https://image.spreadshirtmedia.com/image-server/v1/designs/2104687";

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: props.designs || [],
      currentDesign: 0
    };
  }

  render() {
    return (
      <img src={exampleImage} alt="Heart with rainbow." />
    );
  }
}

export default Vote;
