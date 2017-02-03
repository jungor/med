/**
 * Created by juno on 2017/1/1.
 */

import React from 'react';
import Ps from 'perfect-scrollbar';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
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

  componentDidMount() {
    this.updateHeight();
    this.cmEditor = CodeMirror.fromTextArea(this.editor, {
      mode: 'markdown',
      lineNumbers: true,
      lineWrapping: true,
      viewportMargin: Infinity
    });
    Ps.initialize(this.rootDOM, {theme: 'med'});
    this.cmEditor.on('change', this.updateMDStr);
    this.cmEditor.on('redraw', this.updatePs);
    window.addEventListener('resize', this.updateHeight);
    this.props.addSyncScrollElement(this.rootDOM);
  }

  componentWillUnmount() {
    Ps.destroy(this.rootDOM);
    this.off('change', this.updateMDStr);
    this.off('redraw', this.updatePs);
    window.removeEventListener('resize', this.updateHeight);
    this.props.removeSyncScrollElement(this.rootDOM);
  }

  componentDidUpdate() {
    Ps.update(this.rootDOM);
  }

  /**
   * 使编辑器的高度随内容的增长而增长
   * 待优化：若resize窗口变大后又变小，scrollHeight会保持最大值。
   * @param e
   */
  updateHeight = (e) => {
    this.editor.style.height = this.editor.scrollHeight + 'px';
  };

  updateMDStr = (instance, changeObj) => {
    let newValue = this.cmEditor.getDoc().getValue();
    this.props.updateMDStr(newValue);
  };

  updatePs = () => {
    if (this.rootDOM) {
      Ps.update(this.rootDOM);
    }
  };

  render() {
    return (
      <div
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
        onScroll={this.props.onScroll.bind(undefined, this.rootDOM)}
      >
        <textarea
          ref={(editor)=>{this.editor = editor;}}
          value={this.props.value}
          readOnly="readOnly"
        />
      </div>
    );
  }
}
