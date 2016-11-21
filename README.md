# React tutorial
**Props**
props는 컴포넌트를 사용할 데이터 중 변동되지 않는 데이터를 다룰 때 사용되어진다.

최초로 만들시엔 다음과 같이 사용한다.
~~~javascript
render() {
  return (
    <*TagName>{this.props.propsName}*/>
  );
}
~~~

다른 컴포넌트에서 props이 들어있는 컴포넌트를 사용할 때에는,
> <*ComponentName propsName='values'*/>

와 같이 쓰면 된다.

default 값을 설정할 수도 있는데, 다음과 같이 사용하면 된다.
> *ComponentName*.defaultProps = {
 > *PropsName*: values,
 > *PropsName*: values
> };

type검증은 아래와 같은 방법으로 사용한다
> *ComponentName*.propTypes = {
> *PropsName*: React.PropTypes.string
> };

type에 문제가 있을 경우 브라우저에서 에러를 출력하게 된다.

[type의 종류](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
