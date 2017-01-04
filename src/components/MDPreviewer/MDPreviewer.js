/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import './MDPreviewer.scss';
import 'highlight.js/styles/default.css';

const { PropTypes } = React;


marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

class MDPreviewer extends React.Component {

  static proTypes = {
    name: PropTypes.string,
    dangerouslySetInnerHTML: PropTypes.obj,
  }

  render() {
    return (
      <div
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: marked(this.props.mdstr)}}
      />
    );
  }
}

export default MDPreviewer;
