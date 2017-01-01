/**
 * Created by juno on 2017/1/1/001.
 */
import React from "react";
import './MDPreviewer.scss'

class MDPreviewer extends React.Component {

  render() {
    return (
      <div
        id={this.props.name}
        dangerouslySetInnerHTML={{__html: this.props.html}}
      />
    );
  }
}

export default MDPreviewer;
