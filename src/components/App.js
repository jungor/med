import React from 'react';
import MDEditor from './MDEditor';
import MDPreviewer from './MDPreviewer';
// import { autoBindThis } from '../utils';
import './App.scss';


/**
 * 利用requestAnimationFrame来节流，用CustomEvent来创建节流后优化的事件
 */
(function() {
  let throttle = function(type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
  throttle("scroll", "optimizedScroll");
})();

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    let MDStr = localStorage.getItem('MDStr') || '';
    this.scrollTopRate = undefined; // 这里也有,是为了在scroll事件回调里面修改这个而不直接setState
    this.lastScrolled = undefined;
    this.updateScrollBegin = false;
    this.state = {
      MDStr,
      scrollTopRate: undefined,  // scrollTop/scrollHeight
      lastScrolled: undefined    // 0:editor 1:previewer
    };
  }


  updateMDStr = (e) => {
    let MDStr = e.target.value;
    localStorage.setItem('MDStr', MDStr);
    this.setState({
      MDStr
    });
  };

  updateScrollTopRate = (lastScrolled, e) => {
    return;
    console.log(e.nativeEvent);
    let scrollTopRate = parseInt(e.target.scrollTop * 100 / e.target.scrollHeight);
    // this.setState({
    //   scrollTopRate,
    //   lastScrolled
    // })
    this.scrollTopRate = scrollTopRate;
    this.lastScrolled = lastScrolled;
    if (!this.updateScrollBegin) {
      requestAnimationFrame(()=>{
        this.setState({
          scrollTopRate: this.scrollTopRate,
          lastScrolled: this.lastScrolled
        })
      })
    }
    this.updateScrollBegin = true;
  };

  tryUpdateScroll = () => {
    if (!this.updateScrollBegin) {
      requestAnimationFrame(()=>{
        this.setState({
            scrollTopRate: this.scrollTopRate,
            lastScrolled: this.lastScrolled
        })
      })
    }
  };

  render() {
    return (
      <div className="app-wrapper">
        <MDEditor
          name="md-editor"
          cols="40"
          rows="30"
          value={this.state.MDStr}
          scrollTopRate={this.state.scrollTopRate}
          lastScrolled={this.state.lastScrolled}
          onChange={this.updateMDStr}
          onScroll={this.updateScrollTopRate.bind(this, 0)}
        />
        <div className="v-divider"></div>
        <MDPreviewer
          name="md-previewer"
          MDStr={this.state.MDStr}
          scrollTopRate={this.state.scrollTopRate}
          lastScrolled={this.state.lastScrolled}
          onScroll={this.updateScrollTopRate.bind(this, 1)}
        />
      </div>
    );
  }
}

export default AppComponent;
