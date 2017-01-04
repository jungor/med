/**
 * Created by juno on 2017/1/1.
 */

import React from 'react';
import './MDEditor.scss'

const { PropTypes } = React;

export default class MDEditor extends React.Component {

  static proTypes = {
    name: PropTypes.string,
    cols: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    cols: '80',
    rows: '100'
  };

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
