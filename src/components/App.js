import React from 'react';
import marked from 'marked';
import MDEditor from './MDEditor';
import MDPreviewer from './MDPreviewer';
import { autoBindThis } from '../utils';
import './App.scss';


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      html: ''
    };
    autoBindThis([
      this.mdtext2html
    ], this);
  }

  mdtext2html(e) {
    let mdtext = e.target.value;
    console.log(mdtext);
    let html =  marked(mdtext);
    console.log(html);
    this.setState({
      html
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <MDEditor
          name="md-editor"
          cols="40"
          rows="30"
          onChange={this.mdtext2html}
        />
        <MDPreviewer
          name="md-previewer"
          html={this.state.html}
        />
      </div>

    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
