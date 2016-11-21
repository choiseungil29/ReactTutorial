import React from 'react';

class StateExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      header:'header initial state',
      content: 'content initial state'
    };

    this.updateHeader = this.updateHeader.bind(this);
  }

  updateHeader(text) {
    this.setState({
      header:'header has changed'
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.header}</h1>
        <h2>{this.state.content}</h2>
        <button onClick={this.updateHeader}>Update</button>
      </div>
    );
  }
}

export default StateExample;