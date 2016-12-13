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
    const props = this.props;
    if(props.title && props.msg){
      return (
        <Alert bsStyle={props.style || "danger"}
               onDismiss={props.onClick}>
          <h4>{props.title}</h4>
          <p>{props.msg}</p>
        </Alert>
      );
    }
    if(props.msg){
      return (
        <Alert bsStyle={props.style || "danger"}
               onDismiss={props.onClick}>
          <p>{props.msg}</p>
        </Alert>
      );
    }
    return null;
  }
}

export default StatusMessage;
