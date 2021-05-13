import React, { Component } from "react";
import {hot} from "react-hot-loader";
import update from 'immutability-helper';
import "./App.css";

import Container from '@material-ui/core/Container';

import Toolbar from "./Toolbar.js";
import BarcodeList from "./BarcodeList.js";
import BarcodeInput from "./BarcodeInput.js";
import BarcodeTrashbin from "./BarcodeTrashbin.js";

import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      barcodeItems: {
        
      },
      columns: {
        mainColumn: {
          id: 'mainColumn',
          itemIds: []
        }
      },
      dragHappening: false
    }
  }

  updateEdits = id => prop => value => {
    this.setState(prevState => {
      return update(prevState, {
        barcodeItems: { [id]: {[prop]: {$set: value} }}
      })
    })
  }

  addItem(item) {
    this.setState(prevState => {
      return update(prevState, {
        barcodeItems: {
          $merge: { [item.id]: item }
        },
        columns: {
          'mainColumn': {
            itemIds: {$push: [item.id] }
          }
        }
      })
    })
  }

  onClear(evt) {
    this.setState({
      barcodeItems: {},
      columns: {
        mainColumn: {
          id: 'mainColumn',
          itemIds: []
        }
      }
    })
  }

  onBeforeDragCapture(evt) {
    this.setState({
      dragHappening: true
    })
  }

  onDragEnd(result) {
    this.setState({
      dragHappening: false
    })


    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (destination.droppableId === 'trashBin') {
      this.setState(prevState => {
        return update(prevState, {
          barcodeItems: {
            $unset: [draggableId]
          },
          columns: {
            [source.droppableId]: {
              itemIds: {
                $apply: prevItems => {
                  prevItems.splice(source.index,1)
                  return prevItems
                }
              }
            }
          },
        })
      })

      return
    }

    this.setState(prevState => {
      return update(prevState, {
        columns: {
          [source.droppableId]: {
            itemIds: {
              $apply: prevItems => {
                prevItems.splice(source.index, 1);
                prevItems.splice(destination.index, 0, draggableId);
                return prevItems
              }
            }
          },
        }
      })
    });
  }

  render(){
    return(
      <div className="App">
        <Toolbar title="Vuorokoodit" onClear={this.onClear.bind(this)}/>
        <DragDropContext onDragEnd={this.onDragEnd.bind(this)} onBeforeCapture={this.onBeforeDragCapture.bind(this)}>
          <Container>
            <BarcodeInput addItem={this.addItem.bind(this)} />
            <BarcodeList
              editHandler={this.updateEdits.bind(this)}
              data={this.state.columns.mainColumn.itemIds.map(id => this.state.barcodeItems[id])}
            />
            {this.state.dragHappening &&
              <BarcodeTrashbin />
            }
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

export default hot(module)(App);
