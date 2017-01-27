/**
 * Created by juno on 2017/1/1.
 */

import React from 'react';
import './MDEditor.scss'
import Ps from 'perfect-scrollbar';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.min.css'

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

  componentDidMount() {
    this.updateHeight();
    Ps.initialize(this.rootDOM);
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    Ps.destroy(this.rootDOM);
    window.removeEventListener('resize', this.updateHeight);
  }

  componentDidUpdate() {
    if (this.props.lastScrolled == 0) return;
    this.rootDOM.scrollTop = this.props.scrollTopRate * this.rootDOM.scrollHeight / 100;
  }

  /**
   * 待优化：若resize窗口变大后又变小，scrollHeight会保持最大值。
   * @param e
   */
  updateHeight = (e) => {
    this.editor.style.height = this.editor.scrollHeight + 'px';
  };

  render() {
    return (
      <div
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
      >
        <textarea
          ref={(editor)=>{this.editor = editor;}}
          value={this.props.value}
          onChange={(e)=>{
            if (this.editor) {
              this.updateHeight(e);
            }
            if (this.rootDOM) {
              Ps.update(this.rootDOM);
            }
            this.props.onChange(e);
          }}
          onScroll={this.props.onScroll}
        />
      </div>
    );
  }
}
