/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Alert"}]*/
import React, { Component } from "react";
import {Alert} from "react-bootstrap";

class StatusMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: props.msg || "",
      onclick: props.onclick || (() => {})
    };
  }

  render() {
    if(this.state.msg){
      return (
        <Alert bsStyle="danger" onDismiss={this.state.onclick}>
          <h4>Oh snap! You got an error!</h4>
          <p>{this.state.msg}</p>
        </Alert>
      );
    }
    return null;
  }
}

export default StatusMessage;
