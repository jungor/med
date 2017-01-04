/**
 * Created by juno on 2017/1/1.
 */

import React from 'react';
// import AceEditor from 'react-ace';
import './MDEditor.scss'

const { PropTypes } = React;

export default class MDEditor extends React.Component {

  render() {
    return (
      <textarea
        id={this.props.name}
        cols={this.props.cols}
        rows={this.props.rows}
        value={this.props.value}
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

