/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import './MDPreviewer.scss';
import 'highlight.js/styles/default.css';
import Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css'


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
    Ps.initialize(this.rootDOM);
  }

  componentWillUnmount() {
    Ps.destroy(this.rootDOM);
  }

  componentDidUpdate() {
    Ps.update(this.rootDOM);
    if (this.props.lastScrolled == 1) return;
    this.rootDOM.scrollTop = this.props.scrollTopRate * this.rootDOM.scrollHeight / 100;
  }

  render() {
    return (
      <div
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: marked(this.props.MDStr)}}
        onScroll={this.props.onScroll}
      />
    );
  }
}

export default MDPreviewer;
