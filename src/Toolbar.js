import React, { Component} from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PrintIcon from '@material-ui/icons/Print';

class Toolbar extends Component{
  render(){
    return(
      <div className="Toolbar">
        <ButtonGroup className="toolButtons" color="primary" aria-label="outlined primary button group">
          <Button color="secondary" variant="contained"><DeleteOutlinedIcon /></Button>
          <Button><PrintIcon /></Button>
          <Button>Ipsum</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Toolbar;
