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

### State내부 Array에 원소 삽입/수정/제거

this.state 내부의 Array에 직접 접근하여 삽입/수정/제거를 하면 안된다. 이건 flask할때 겪었던 증상과 같은 맥락인듯싶다.
그래서 react-addons-update를 사용하려 했지만 이미 deprecated된듯하고 Immutability-helper를 사용하였다.

~~~
$ npm install --save immutability-helper
~~~

js에 소스 추가
~~~
import update from 'immutability-helper;
~~~

#### 원소 삽입하기
~~~javascript
this.setState({
  contactData: update(this.state.contactData, {
    $push: [{'name': name, 'phone': phone}]
  })
});
~~~

#### 원소 수정하기

#### 원소 삭제하기
~~~javascript
this.setState({
  contactData: update(this.state.contactData, {
    $splice: [[this.state.selectedKey, 1]]
  }),
  selectedKey: -1
});
~~~
$splice시 []안에 배열을 던져 삭제할 범위를 지정한다.
ex) $splice: [ [startIndex, range] ]
