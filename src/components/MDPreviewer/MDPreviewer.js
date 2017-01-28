/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import './MDPreviewer.scss';
import 'highlight.js/styles/default.css';
import Ps from 'perfect-scrollbar';

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
  };

  componentDidMount() {
    Ps.initialize(this.rootDOM, {theme: 'med'});
    this.props.addSyncScrollElement(this.rootDOM);
  }

  componentWillUnmount() {
    Ps.destroy(this.rootDOM);
    this.props.removeSyncScrollElement(this.rootDOM);
  }

  render() {
    return (
      <div
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: marked(this.props.MDStr)}}
        onScroll={this.props.onScroll.bind(undefined, this.rootDOM)}
      />
    );
  }
}

export default MDPreviewer;
