import React, { Component} from "react";
import styled from 'styled-components';
import BarcodeItem from './BarcodeItem.js';

const Container = styled.div`
  margin: 8px;
  border: 2px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3``;

class BarcodeList extends Component {
  render(){
    return(
      <div>
        <Container>
          {this.props.data.map(item => <BarcodeItem editHandler={this.props.editHandler(item.id)} itemId={item.id} name={item.name} code={item.code} key={item.id}/>)}
        </Container>
      </div>
    )
  }
}

export default BarcodeList;
