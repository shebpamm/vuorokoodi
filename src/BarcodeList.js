import React, { Component} from "react";
import styled from 'styled-components';
import BarcodeItem from './BarcodeItem.js';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 2px solid lightgrey;
  border-radius: 2px;
`;

const EmptyNotice = styled.h1`
  margin: 50px;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  font-size: 25px;
  color: #888888
`;

const Title = styled.h3``;
class BarcodeList extends Component {
  render(){
    return(
      <div>
        <Droppable droppableId='mainColumn'>
          {provided => (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >

              {this.props.data.length === 0 &&
                <EmptyNotice>No barcodes yet. Add one above!</EmptyNotice>
              }

              {this.props.data.map((item, index) =>
                <BarcodeItem
                editHandler={this.props.editHandler(item.id)}
                itemId={item.id}
                name={item.name}
                code={item.code}
                key={item.id}
                index={index}
                />
              )}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </div>
    )
  }
}

export default BarcodeList;
