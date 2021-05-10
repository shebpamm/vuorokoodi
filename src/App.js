import React, { Component} from "react";
import {hot} from "react-hot-loader";
import update from 'immutability-helper';
import "./App.css";

import Container from '@material-ui/core/Container';

import Toolbar from "./Toolbar.js";
import BarcodeList from "./BarcodeList.js";


class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      barcodeItems: {
        'barcode-1': { id: "barcode-1", name: "Erik Karsten", code: "12345678" },
        'barcode-2': { id: "barcode-2", name: "Otava Mäkinen", code: "12345678" },
        'barcode-3': { id: "barcode-3", name: "Sorsa Lampi", code: "13345678" },
        'barcode-4': { id: "barcode-4", name: "Lorem Ipsum", code: "23345678" },
      },
      columns: {
        'mainColumn': {
          id: 'main-col',
          itemIds: ['barcode-1', 'barcode-2', 'barcode-3']
        }
      }
    }
  };

  updateEdits = id => prop => value => {
    this.setState(prevState => {
      return update(prevState, {
        barcodeItems: { [id]: {[prop]: {$set: value} }}
      })
    })
  }

  render(){
    return(
      <div className="App">
        <Toolbar title="Vuorokoodit"/>
        <Container >
          <BarcodeList editHandler={this.updateEdits.bind(this)} data={this.state.columns.mainColumn.itemIds.map(id => this.state.barcodeItems[id])}/>
        </Container>
      </div>
    );
  }
}

export default hot(module)(App);
