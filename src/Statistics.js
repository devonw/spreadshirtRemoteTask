/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "React|Table"}]*/
import React, { Component } from "react";
import {Table} from "react-bootstrap";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      designs: props.designs || new Map(), // designId -> design
      history: props.history || new Map() // keywords -> [designId]
    };
  }

  render() {
    const state = this.state;
    const rows = Array.from(state.history).map((kdPair) => {
      const keywords = kdPair[0];
      var total = 0, up = 0, down = 0;
      const designIds = kdPair[1];
      for(let designId of designIds){
        const design = state.designs.get(designId);
        if("vote" in design){
          total++;
          if(design.vote > 0){
            up++;
          }else{
            down++;
          }
        }
      }
      return (
        <tr>
          <td>{keywords}</td>
          <td>
            <dl>
              <dt>Total:</dt>
              <dd>{total}</dd>
              <dt>Up:</dt>
              <dd>{up}</dd>
              <dt>Down:</dt>
              <dd>{down}</dd>
            </dl>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h4>Statistics on past votes:</h4>
        <Table striped bordered condensed hover>
           <thead>
             <tr>
               <th>Search:</th>
               <th>Votes:</th>
             </tr>
           </thead>
           <tbody>
           {rows}
           </tbody>
           <tfoot>
             <tr>
              <th>Total searches:</th>
              <th>{state.history.size}</th>
             </tr>
           </tfoot>
         </Table>
      </div>
    );
  }
}

export default Statistics;
