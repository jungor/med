import React from 'react';
import MDEditor from './MDEditor';
import MDPreviewer from './MDPreviewer';
import { autoBindThis } from '../utils';
import './App.scss';


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    let mdstr = localStorage.getItem('mdstr') || '';
    this.state = {
      mdstr
    };
    autoBindThis([
      this.updateMdstr
    ], this);
  }


  updateMdstr(e) {
    let mdstr = e.target.value;
    localStorage.setItem('mdstr', mdstr);
    this.setState({
      mdstr
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <MDEditor
          name="md-editor"
          cols="40"
          rows="30"
          value={this.state.mdstr}
          onChange={this.updateMdstr}
        />
        <MDPreviewer
          name="md-previewer"
          mdstr={this.state.mdstr}
        />
      </div>

    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
