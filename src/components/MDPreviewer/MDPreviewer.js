/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import Ps from 'perfect-scrollbar';
import classnames from 'classnames';
import './MDPreviewer.scss';

const { PropTypes } = React;
const renderer = new marked.Renderer();
const markedOptions = {
  renderer,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
};

marked.setOptions(markedOptions);

const checkedTaskItemPtn = /^\[[vx]] +/;
const uncheckedTaskItemPtn = /^\[[ ]] +/;


/**
 * 重写基类的code生成方法。将代码块包在一个ol里，以显示行号
 * @param code
 * @param lang
 * @param escaped
 * @return {string}
 */
renderer.listitem = function (text, level) {
  let isCheckedTaskItem = checkedTaskItemPtn.test(text);
  let isUncheckedTaskItem = uncheckedTaskItemPtn.test(text);
  if (isCheckedTaskItem) text = text.replace(checkedTaskItemPtn, '<i class="fa fa-check-square" aria-hidden="true"></i>')+'\n';
  if (isUncheckedTaskItem) text = text.replace(uncheckedTaskItemPtn, '<i class="fa fa-square-o" aria-hidden="true"></i>')+'\n';
  let cls = (isCheckedTaskItem || isUncheckedTaskItem) ? ' class="todo-list-item"' : '';
  return '<li'+ cls + '>' + text + '</li>\n';
};

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

  componentDidUpdate() {
    this.typesetMathjax();
  }

  /**
   * 重新渲染数学公式
   */
  typesetMathjax = () => {
    if (!this.rootDOM) return;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.rootDOM]);
  };

  render() {

    return (
      <div
        className="markdown-body"
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: marked(this.props.MDStr, {renderer})}}
        onScroll={this.props.onScroll.bind(undefined, this.rootDOM)}
      />
    );
  }
}

export default MDPreviewer;
