import React from 'react';
import Header from './Header';
import Content from './Content';

class App extends React.Component {
	render() {
		return (
      <div>
        <Header title={this.props.headerTitle} />
        <Content title={this.props.bodyTitle}
                 content={this.props.content} />
      </div>
		);
	}
}

/*
  props에 default값을 대입하는 과정.
 */
App.defaultProps = {
  headerTitle: 'default h1 title',
  bodyTitle: 'default h2 title',
  content: 'default content'
};

/*
  타입 지정하는 과정. props에 의도되지 않은 타입이 입력될 경우 브라우저에서 오류가 난다.
  타입의 종류는 https://facebook.github.io/react/docs/typechecking-with-proptypes.html 참고
 */
App.propTypes = {
  headerTitle: React.PropTypes.string,
  bodyTitle: React.PropTypes.string,
  content: React.PropTypes.string.isRequired
};

export default App;