import React, { Component} from "react";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styled, { css } from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const StyledDeleteOutlinedIcon = styled(DeleteOutlinedIcon)`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 45px;
  width: 100px;
  height: 50px;
`;

const Container = styled.div`
  margin: 8px;
  border: 2px solid lightgrey;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  height: 150px;

  background-color: #ff1744;
  position:relative
`;

class BarcodeTrashbin extends Component {
  render() {
    return(
      <Droppable droppableId='trashBin'>
      {provided => (
        <Container
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={this.props.style}
        >
          <StyledDeleteOutlinedIcon style={{ color: '#fefefe' }} fontSize="large" />
          {provided.placeholder}
        </Container>
      )}
      </Droppable>
    )
  }
}

export default BarcodeTrashbin;
