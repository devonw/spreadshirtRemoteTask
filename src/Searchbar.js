/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React"}]*/
import React, { Component } from "react";

class Searchbar extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup controlId="keywords">
          <ControlLabel>Name</ControlLabel>
          {" "}
          <FormControl type="text" placeholder="Keywords…" />
        </FormGroup>
        <Button controlId="searchButton">
          Search
        </Button>
      </Form>
    );
  }
}

export default Searchbar;
