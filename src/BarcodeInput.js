import React, { Component } from "react";
import styled, { css } from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
  margin: 8px;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-family: 'Nunito', sans-serif;
  font-size: 30px;
  color: #444444;
  margin-right: 20px;

  ${props => props.bold && css`
    font-weight: 700;
  `}
`;

const StyledTextField = styled(TextField)`
  margin-right: 20px;
`;

const StyledButton = styled(Button)`
  margin-right: 20px;
`;

class BarcodeInput extends Component {
  constructor(props) {
  super(props)
  this.state = {
    nameCorrect: false,
    codeCorrect: false,
    code: '',
    name: ''
  }
  }

  nameChange(evt) {
    this.setState({
      name: evt.target.value,
      nameCorrect: evt.target.value.length !== 0
    })
  }

  codeChange(evt) {
    this.setState({
      code: evt.target.value,
      codeCorrect: (evt.target.value === evt.target.value.replace(/[^0-9]/g, '') && evt.target.value.length !== 0),
      codeIncorrect: (evt.target.value !== evt.target.value.replace(/[^0-9]/g, ''))
    })
  }

  onSubmit(evt) {
    this.setState({
      code: '',
      name: '',
      codeCorrect: false,
      codeIncorrect: false,
      nameCorrect: false
    })

    this.props.addItem({
      id: uuidv4(),
      name: this.state.name,
      code: this.state.code
    })
  }


  render(){
    return(
      <Container>
          <Text bold>New Barcode:</Text>
          <StyledTextField value={this.state.name} id="input-name" label="Name" variant="outlined" onChange={this.nameChange.bind(this)}/>
          <StyledTextField value={this.state.code} id="input-code" label="Session ID" variant="outlined" error={this.state.codeIncorrect} onChange={this.codeChange.bind(this)}/>
          <StyledButton variant="contained" size="large" onClick={this.onSubmit.bind(this)} disabled={(this.state.codeCorrect && this.state.nameCorrect) ? false : true}>
            Add Barcode
          </StyledButton>
      </Container>
    )
  }
}

export default BarcodeInput;
