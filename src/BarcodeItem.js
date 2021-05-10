import React, { Component} from "react";
import styled, { css } from 'styled-components';
import JsBarcode from 'jsbarcode';
import BarcodeItemText from './BarcodeItemText.js';

const Container = styled.div`
  margin: 8px;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.first && css`
    justify-content: flex-start;
    padding-left: 25px;
  `}
`;


const Text = styled.span`
  font-family: 'Nunito', sans-serif;
  font-size: 35px;
`;

class BarcodeItem extends Component {
  constructor(props){
    super(props)
    this.id = "img-" + this.props.itemId;
  }

  componentDidMount(){
    JsBarcode('#' + this.id, this.props.code, {
      format: "CODE39",
      displayValue: false
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code && this.props.code !== '') {
      JsBarcode('#' + this.id, this.props.code, {
        format: "CODE39",
        displayValue: false
      });
    }
  }

  render(){
    return(
      <Container>
        <Column first>
          <BarcodeItemText editHandler={this.props.editHandler('name')} text={this.props.name}/>
        </Column>
        <Column>
          <BarcodeItemText editHandler={this.props.editHandler('code')} text={this.props.code}/>
        </Column>
        <Column>
          <svg id={this.id}></svg>
        </Column>
      </Container>
    )
  }
}

export default BarcodeItem;
