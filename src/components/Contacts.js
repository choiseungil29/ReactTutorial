import React from 'react';
import update from'immutability-helper';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name:'clogic', phone:'010-0000-0000'},
        {name:'clogic', phone:'010-0000-0001'},
        {name:'clogic', phone:'010-0000-0002'},
        {name:'clogic', phone:'010-0000-0003'}
      ],
      selectedKey: -1,
      selected: {
        name: '',
        phone: ''
      }
    };
  }

  onSelect(key) {
    if(this.state.selectedKey == key) {
      console.log('key select canceled');
      this.setState({
        selectedKey: -1,
        selected: {
          name: '',
          phone: ''
        }
      });
      return;
    }

    this.setState({
      selectedKey: key,
      selected: this.state.contactData[key]
    });
    console.log(key + ' is selected');
  }

  isSelected(key) {
    if(this.state.selectedKey == key) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <h1>contacts</h1>
        <ul>
          {this.state.contactData.map((contact, i) => {
            return (<ContactInfo name={contact.name}
                                  phone={contact.phone}
                                  key={i}
                                  contactKey={i}
                                  onSelect={this.onSelect.bind(this)}
                                  isSelected={this.isSelected.bind(this)}/>);
          })}
        </ul>
        <ContactCreator insert={this._insert.bind(this)} />
        <ContactRemover remove={this._remove.bind(this)}/>
        <ContactEditor onEdit={this._edit.bind(this)}
                       isSelected={(this.state.selectedKey != -1)}
                       contact={this.state.selected} />
      </div>
    );
  }

  _insert(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [{'name': name, 'phone': phone}]
      })
    });
  }

  _edit(name, phone) {
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
  }

  _remove() {
    if(this.state.selectedKey == -1) {
      console.log('contact is not selected');
      return;
    }

    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]]
      }),

      selectedKey: -1
    });
  }
}

class ContactInfo extends React.Component {

  onClick() {
    this.props.onSelect(this.props.contactKey);
  }

  render() {

    let getStyle = (isSelected) => {
      if(!isSelected(this.props.contactKey)) {
        return;
      }

      let style = {
        fontWeight: 'bold',
        backgroundColor: '#4efcd8'
      };

      return style;
    }

    return (<li style={getStyle(this.props.isSelected)} onClick={this.onClick.bind(this)}>{this.props.name} {this.props.phone}</li>);
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

class ContactEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: ''
    };
  }

  // ContactEditor 내부의 임의의 props가 외부에서 변경되었을때 호출되어진다.
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.contact.name,
      phone: nextProps.contact.phone
    });
  }

  onClick() {
    if(!this.props.isSelected) {
      console.log("contact is not selected");
      return;
    }
    this.props.onEdit(this.state.name, this.state.phone);
  }

  onChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <p>
          <input type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.onChange.bind(this)}/>

          <input type="text"
              name="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.onChange.bind(this)}/>
          <button onClick={this.onClick.bind(this)}>
          Edit
          </button>
        </p>
      </div>
      );
  }
}

class ContactRemover extends React.Component {

  onClick() {
    this.props.remove();
  }

  render() {
    return (<button onClick={this.onClick.bind(this)}>Remove selected contact</button>);
  }
}

export default Contacts;
















