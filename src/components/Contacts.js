import React from 'react';
import update from'immutability-helper';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'clogic',
      contactData: [
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'}
      ],
      test: 'what?'
    };
  }

  insert(name, phone) {

    /**
     * 이것도 된다.
     */
    let newState = update(this.state.contactData, {
      $push: [{'name': name, 'phone': phone}]
    });
    this.setState({
      contactData: newState
    });

    /**
     * 아래 주석쳐둔 코드도 정상작동
     */
    /*this.setState({
      contactData: update(this.state.contactData, {
        $push: [{'name': name, 'phone': phone}]
      })
    });*/
    console.log(this.state);
    console.log(this.state.contactData);
  }

  render() {
    return (
      <div>
        <h1>contacts</h1>
        <ul>
          {this.state.contactData.map((contact, i) => {
            return (<ContactInfo name={contact.name} phone={contact.phone} key={i}/>);
          })}
        </ul>
        <ContactCreator insert={this.insert.bind(this)} />
      </div>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    return (<li>{this.props.name} {this.props.phone}</li>);
  }
}

class ContactCreator extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: ''
    };
  }

  onChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onClick() {
    this.props.insert(this.state.name, this.state.phone);
    this.setState({
      name: '',
      phone: ''
    });
  }

  render() {
    return (
      <div>
        <input type='text' name='name' placeholder='name' value={this.state.name} onChange={this.onChange.bind(this)} />
        <input type='text' name='phone' placeholder='phone' value={this.state.phone} onChange={this.onChange.bind(this)} />
        <button onClick={this.onClick.bind(this)} >add!</button>
      </div>
    );
  }
}

export default Contacts;