import React from 'react';
import MDEditor from './MDEditor';
import MDPreviewer from './MDPreviewer';
import Ps from 'perfect-scrollbar';
import './App.scss';

/**
 * 利用requestAnimationFrame来节流，用CustomEvent来创建节流后优化的事件
 * @param type               要节流的事件名
 * @param name               新事件名
 * @param obj                监听对象
 * @return {unThrottle}      取消节流
 */
function throttleNativeEvent(type, name, obj) {
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
  function unThrottle() {
    obj.removeEventListener(type, func);
  }
  return unThrottle;
}

/**
 * RAF版本函数节流
 * @param fn
 * @return {Function}
 */
function throttleWithRAF(fn) {
  let hadRequested = false;
  function throttledFn() {
    if (!hadRequested) {
      requestAnimationFrame(()=>{
        fn.apply(undefined, arguments);
        hadRequested = false;
      });
      hadRequested = true;
    }
  }
  throttledFn.unThrottleFn = fn;
  return throttledFn;
}

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    let MDStr = localStorage.getItem('MDStr') || '';
    this.state = {
      MDStr
    };
    this.scrollTopRate = undefined; // 这里也有,是为了在scroll事件回调里面修改这个而不直接setState
    this.lastScrolled = undefined;
    this.hadRequestedAF = false; // 是否已经调用了requestAnimationFrame
    this.sycnScrollElements = [];
  }


  updateMDStr = (MDStr) => {
    localStorage.setItem('MDStr', MDStr);
    this.setState({
      MDStr
    }, this.syncScrollAll); // 改变内容后需要更新所有滚动条
  };

  updateScrollTop = (lastScrolled, e) => {
    // 相关数据需要一直维护
    this.scrollTopRate = e.target.scrollTop;
    this.lastScrolled = lastScrolled;
    // dom更新只需每帧(16ms/f=1s/60fps)更新一次
    if (!this.hadRequestedAF) {
      // 类似设置了一个16ms的timeout，但是性能更好，不容易丢帧
      requestAnimationFrame(this.syncScrollWhenScrolling);
      this.hadRequestedAF = true;    // 使得这个帧内不得再发起请求
    }
  };

  addSyncScrollElement = (element) => {
    let index  = this.sycnScrollElements.indexOf(element);
    if (index < 0) {
      this.sycnScrollElements.push(element);
    }
  };

  removeSyncScrollElement = (element) => {
    let index  = this.sycnScrollElements.indexOf(element);
    if (index >= 0) {
      this.sycnScrollElements.splice(index, 1);
    }
  };

  /**
   * 滚动同步。用于滚动某一个视图时候
   */
  syncScrollWhenScrolling = () => {
    this.sycnScrollElements.forEach((element) => {
      if (element == this.lastScrolled) return;
      element.scrollTop = this.scrollTopRate;
      Ps.update(element);
    });
    this.hadRequestedAF = false; // 重置flag使得下一帧可以发起请求
  };

  /**
   * 滚动同步。用途编辑器内容改变的时候
   */
  syncScrollAll = () => {
    this.sycnScrollElements.forEach((element) => {
      element.scrollTop = this.scrollTopRate;
      Ps.update(element);
    });
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
          addSyncScrollElement={this.addSyncScrollElement}
          removeSyncScrollElement={this.removeSyncScrollElement}
          updateMDStr={this.updateMDStr}
          onScroll={this.updateScrollTop}
        />
        <div className="v-divider"></div>
        <MDPreviewer
          name="md-previewer"
          MDStr={this.state.MDStr}
          scrollTopRate={this.state.scrollTopRate}
          lastScrolled={this.state.lastScrolled}
          addSyncScrollElement={this.addSyncScrollElement}
          removeSyncScrollElement={this.removeSyncScrollElement}
          onScroll={this.updateScrollTop}
        />
      </div>
    );
  }
}

export default AppComponent;
