# React tutorial

내 마음대로 작성하는 리액트 튜토리얼

## Props

props는 컴포넌트를 사용할 데이터 중 컴포넌트 내부에서 변동되지 않는 데이터를 다룰 때 사용되어진다.

최초로 만들시엔 다음과 같이 사용한다.
~~~javascript
render() {
  return (
    <TagName>{this.props.propsName}/>
  );
}
~~~

다른 컴포넌트에서 props이 들어있는 컴포넌트를 사용할 때에는,
~~~javascript
<ComponentName propsName='values'/>
~~~

와 같이 쓰면 된다.

default 값을 설정할 수도 있는데, 다음과 같이 사용하면 된다.
~~~javascript
ComponentName.defaultProps = {
  PropsName: values,
  PropsName: values
};
~~~

type검증은 아래와 같은 방법으로 사용한다
~~~javascript
ComponentName.propTypes = {
  PropsName: React.PropTypes.string
};
~~~

props의 type과 들어온 값의 type이 일치하지 않을시 브라우저에서 에러를 출력하게 된다.

[type의 종류](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## State

state는 하위 컴포넌트에 유동적인 데이터를 넣을 때 사용되어진다.

~~~javascript
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
~~~

state 생성 및 초기화

~~~javascript
this.state = {
  header:'header initial state',
  content: 'content initial state'
}; 
~~~

state를 렌더링

~~~javascript
<h1>{this.state.header}</h1>
<h2>{this.state.content}</h2>
~~~

state 업데이트

~~~javascript
updateHeader(text) {
  this.setState({
    header:'header has changed'
  });
}
~~~

와 같이 사용한다.

state를 업데이트 할 때 ES6의 class에서는 auto binding이 되지 않으므로 setState 메소드를 포함하는 메소드를 bind해주어야 한다.
