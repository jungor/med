/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import './MDPreviewer.scss';
import 'highlight.js/styles/default.css';

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

class MDPreviewer extends React.Component {

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
