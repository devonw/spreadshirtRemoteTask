/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Button|Form(Control|Group)|InputGroup|Glyphicon"}]*/
import React, { Component } from "react";
import {Button,
        FormControl,
        FormGroup,
        Glyphicon,
        InputGroup} from "react-bootstrap";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {keywords: ""};

    this.updateKeywords = this.updateKeywords.bind(this);
    this.searchKeywords = this.searchKeywords.bind(this);
  }

  updateKeywords() {
    this.setState({keywords: event.target.value});
  }

  searchKeywords() {
    window.alert("SOMETIHNG HAPPENED!");
  }

  render() {
    return (
      <FormGroup controlId="keywords">
        <InputGroup>
          <FormControl type="text"
                       placeholder="Keywords…"
                       value={this.state.keywords}
                       onChange={this.updateKeywords} />
          <InputGroup.Button onClick={this.searchKeywords}>
            <Button>
              <Glyphicon glyph="search"/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Searchbar;
