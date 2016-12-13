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
    this.state = {
      keywords: "",
    };

    this.updateKeywords = this.updateKeywords.bind(this);
  }

  updateKeywords() {
    this.setState({keywords: event.target.value});
  }

  render() {
    return (
      <FormGroup controlId="keywords">
        <InputGroup>
          <FormControl type="text"
                       placeholder="Keywords…"
                       value={this.state.keywords}
                       onChange={this.updateKeywords} />
          <InputGroup.Button
            onClick={() => {this.props.onSearch(this.state.keywords);}}
            ref="searchInput">
            <Button ref="searchButton">
              <Glyphicon glyph="search"/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Searchbar;
