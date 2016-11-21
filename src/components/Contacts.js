import React from 'react';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0000'}
      ]
    };
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
      </div>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    return (<li>{this.props.name} {this.props.phone}</li>);
  }
}

export default Contacts;