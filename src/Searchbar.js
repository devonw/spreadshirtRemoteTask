/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Button|Form(Control|Group)|InputGroup"}]*/
import React, { Component } from "react";
import {Button,
        FormControl,
        FormGroup,
        InputGroup} from "react-bootstrap";

class Searchbar extends Component {
  render() {
    return (
      <FormGroup controlId="keywords">
        <InputGroup>
          <FormControl type="text" placeholder="Keywords…" />
          <InputGroup.Button>
            <Button>
            Search
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    );
  }
}

export default Searchbar;
