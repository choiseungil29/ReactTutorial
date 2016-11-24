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
~~~javascript
this.setState({
  contactData: update(
    this.state.contactData,
    {
      [this.state.selectedKey]: {
        name: { $set: name },
        phone: { $set: phone }
      }
    }
  ),
  selected: {
    name: name,
    phone: phone
  }
});
~~~

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

## Component Lifecycle
### 컴포넌트 생성 시
constructor -> componentWillMount -> render -> componentDidMount
### 컴포넌트 내부 props가 변경되었을 시
componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidMount
### 컴포넌트 내부 state가 변경되었을 시
shouldComponentUpdate -> componentWillUpdate -> render -> componentDidMount
### 컴포넌트 삭제 시
componentWillUnmount

#### 함수별 역할

##### 생성

**constructor**
- state들을 생성할 수 있다.

**componentWillMount**
- 마운트 되기 이전에 실행되는 함수
- 컴포넌트가 DOM위에 만들어지기 전에 실행된다.

**render**
- 실제 컴포넌트의 렌더링을 담당하는 함수

**componentDidMount**
- 컴포넌트 최초 렌더링 후 실행되어지는 함수
- AJAX연동이나 여타 javascript 라이브러리와의 연동이 가능하다고 한다.

##### 내부 props 및 state 변경 시

**componentWillReceiveProps**
- props의 값이 상위 컴포넌트에서 변경되었을 때 호출되어진다.
- 여기서 setState를 하면 값은 변경되어지지만, 추가적인 과정이 발생하지는 않는다.

**shouldComponentUpdate**
- props또는 state가 변경된 후 진입하는 함수로, 다시한번 렌더링을 거칠지 거치지 않을 지 결정하는 함수
- true를 return하면 새롭게 렌더링되어진다.

**componentWillUpdate**
- 컴포넌트가 업데이트 되기 이전에 실행된다.
- 여기서 setState의 과정을 거치면 무한루프에 빠지게 된다
- setState시 shouldComponentUpdate로 진입하고, componentWillUpdate로 진입하는 과정을 반복하기 때문인가? 알아봐야함


**componentDidMount**
- 컴포넌트가 렌더링을 마친 후 실행된다.
- 어디에 쓰일까...

##### 삭제

**componentWillUnmount**
- 컴포넌트가 DOM에서 사라진 이후에 실행되어진다.
