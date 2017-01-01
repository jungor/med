/**
 * Created by juno on 2017/1/1.
 */

import React from 'react';
// import AceEditor from 'react-ace';
import './MDEditor.scss'

const { PropTypes } = React;

export default class MDEditor extends React.Component {

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      // <AceEditor
      //   name={this.props.name}
      //   mode={this.props.mode}
      //   theme={this.props.mode}
      //   fontSize={this.props.fontSize}
      //   onChange={this.props.onChange}
      // />
      <textarea
        id={this.props.name}
        cols={this.props.cols}
        rows={this.props.rows}
        onChange={this.props.onChange}
      />
    );
  }
}

MDEditor.propTypes = {
  name: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string
};

MDEditor.defaultProps = {
  name: 'MDEditor',
  cols: '80',
  rows: '100'
};

