import React, { Component} from "react";
import ContentEditable from 'react-contenteditable'
import styled, { css } from 'styled-components';

const EditableText = styled(ContentEditable)`
  font-family: 'Nunito', sans-serif;
  font-size: 35px;
  cursor: text;
`;

class BarcodeItemText extends React.Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef();
    this.state = {html: this.props.text};
  };

  handleChange = evt => {
    let content = evt.target.value;
    if(this.props.numbers) content = evt.target.value.replace(/[^0-9]/g, '');

    this.setState({html: content});
    this.props.editHandler(content);
  };

  render = () => {
    return <EditableText
              innerRef={this.contentEditable}
              html={this.state.html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='span' // Use a custom HTML tag (uses a div by default)
              spellCheck='false'
            />
  };
};

export default BarcodeItemText;
