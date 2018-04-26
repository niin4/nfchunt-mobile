import React, { Component } from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import GLOBALS from '../Globals';

const postForm = (path, user) => {
  var details = {
    'instanceid': user.instanceid,
    'password': user.password,
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const req = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  };
  return fetch(path, req);
}
class LoginStateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    }
  }

  async checkLogin() {
    try {
      const token = await AsyncStorage.getItem('NFCToken');
      if (token !== null) {
        this.setState({token: token})
      } else {
        //register
        const user = {};
        user.password = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
          user.password += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        user.instanceid = this.props.user;
        const path = `${GLOBALS.BASE_URL}/appsignup`;
        postForm(path, user)
        .then((res) => { return res.json()})
        .then((data) => {
          AsyncStorage.setItem('NFCUser', user.instanceid);
          AsyncStorage.setItem('NFCPassword', user.password);
          AsyncStorage.setItem('NFCToken', data.token);
        })
        .catch((err) => {this.setState({error: error})});
      }
    } catch (error) {
      this.setState({error: error})
      // Error retrieving data
    }
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return null
  }
}


const mapStateToProps = state => ({
  user: state.gameState.user
});

const LoginState = connect(mapStateToProps)(LoginStateView);

export default LoginState;

