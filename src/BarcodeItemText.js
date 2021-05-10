import React, { Component} from "react";
import ContentEditable from 'react-contenteditable'
import styled, { css } from 'styled-components';

const EditableText = styled(ContentEditable)`
  font-family: 'Nunito', sans-serif;
  font-size: 35px;
`;

class BarcodeItemText extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {html: this.props.text};
  };

  handleChange = evt => {
    this.setState({html: evt.target.value});
    this.props.editHandler(evt.target.value);
  };

  render = () => {
    return <EditableText
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='span' // Use a custom HTML tag (uses a div by default)
            />
  };
};

export default BarcodeItemText;
