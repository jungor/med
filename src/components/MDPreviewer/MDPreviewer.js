/**
 * Created by juno on 2017/1/1/001.
 */
import React from 'react';
import marked from 'marked';
import Ps from 'perfect-scrollbar';
import './MDPreviewer.scss';

const { PropTypes } = React;
const renderer = new marked.Renderer();

class TOCGenerator {
  constructor() {
    this.headList = [];
  }
  addHead = (text, level, raw) => {
    this.headList.push({text, level, raw});
  };
  reset = () => {
    this.headList = [];
  };
  genToc = () => {
    // TODO 具体算法不详，用着自己的逻辑
    console.log(this.headList);
    let out = '<div class="toc">';
    // let curLevel = 0;
    // for (let h of this.headList) {
    //   if (h.level > curLevel) {
    //     out += `<ul><li>${h.text}</li>>`;
    //   } else if (h.level == curLevel) {
    //     out += `<li>${h.text}</li>`;
    //   } else {
    //     let diff = curLevel - h.level;
    //     while (diff--) {
    //       out += '</ul>';
    //     }
    //     out += `<ul><li>${h.text}</li>>`;
    //   }
    //   curLevel = h.level;
    // }
    for (let h of this.headList) {
      let href = '#' + h.raw.toLowerCase().replace(/[^\w]+/g, '-');
      out += `<p class=${'level'+h.level}><a href=${href}>${h.text}</a></p>`;
    }
    out += '</div>';
    console.log(out);
    return out;
  };
}

let tocGen = new TOCGenerator();

/**
 * 重写基类的listitem生成方法。用于生成todolist
 * @param code
 * @param lang
 * @param escaped
 * @return {string}
 */
renderer.listitem = function (text, level) {
  const checkedTaskItemPtn = /^\[[vx]] +/;
  const uncheckedTaskItemPtn = /^\[[ ]] +/;
  let isCheckedTaskItem = checkedTaskItemPtn.test(text);
  let isUncheckedTaskItem = uncheckedTaskItemPtn.test(text);
  if (isCheckedTaskItem) text = text.replace(checkedTaskItemPtn, '<i class="fa fa-check-square" aria-hidden="true"></i>')+'\n';
  if (isUncheckedTaskItem) text = text.replace(uncheckedTaskItemPtn, '<i class="fa fa-square-o" aria-hidden="true"></i>')+'\n';
  let cls = (isCheckedTaskItem || isUncheckedTaskItem) ? ' class="todo-list-item"' : '';
  return '<li'+ cls + '>' + text + '</li>\n';
};

let sup = renderer.heading;
renderer.heading = function (text, level, raw) {
  tocGen.addHead(text, level, raw);
  return sup.call(this, text, level, raw);
};

const markedOptions = {
  renderer,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
};

marked.setOptions(markedOptions);

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

  genHTML = () => {
    tocGen.reset();
    let html = marked(this.props.MDStr, {renderer});
    return tocGen.genToc()+html;
  };

  render() {
    return (
      <div
        className="markdown-body"
        ref={(rootDOM)=>{this.rootDOM = rootDOM;}}
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: this.genHTML()}}
        onScroll={this.props.onScroll.bind(undefined, this.rootDOM)}
      />
    );
  }
}

export default MDPreviewer;
