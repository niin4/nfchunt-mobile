import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground
} from 'react-native';
import NfcManager, {NdefParser} from 'react-native-nfc-manager';

import GLOBALS from '../Globals';
import { setTag } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');
const nfcIcon = require('../assets/nfc_icon.jpeg');

class RegisterTagView extends Component {
  static navigationOptions = { ...navStyle, title: 'Register tag' };

  constructor(props) {
    super(props);
    this.state = {
      tagData: this.props.tag,
      supported: true,
      enabled: false,
      isWriting: false,
      urlToWrite: '',
      tag: {},
      messages: ['Waiting for tag...']
    }   
  }

  componentDidMount() {
    const url = `${GLOBALS.BASE_URL}/tag/${this.state.tagData.t_id}`;
    this.setState({urlToWrite: url})
    NfcManager.isSupported()
      .then(supported => {
        this.setState({ supported });
        if (supported) {
          this._startNfc();
          this._startDetection();
        }
      })
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
    }
  }
  
  render() {
    let { supported, enabled, tag, isWriting, urlToWrite, tagData, messages } = this.state;
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.boxCenter}>
            <Text style={styles.h2}>Bring tag near phone</Text>
            <Image style={{width: 100, height: 100}} source={nfcIcon}/>
            {messages.map((msg) => 
              <Text key={msg} style={styles.bold}>{msg}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }

  _requestNdefWrite = () => {
    function strToBytes(str) {
      let result = [];
      for (let i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
      }
      return result;
    }

    let { isWriting, urlToWrite } = this.state;
    if (isWriting) {
      return;
    }

    const urlBytes = strToBytes(urlToWrite);
    const headerBytes = [0xD1, 0x01, (urlBytes.length + 1), 0x55, 0x00];
    const bytes = [...headerBytes, ...urlBytes];

    this.setState({isWriting: true });
    NfcManager.requestNdefWrite(bytes)
      .then(() => {
        this.setState({messages: [...this.state.messages, 'Tag ready!', 'Returning to previous page']})
        setTimeout(() => {this.props.navigation.navigate('ViewTag')}, 1000)
        console.log('write completed')}
      )
      .catch(err => console.warn(err))
      .then(() => this.setState({ isWriting: false }));
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
      .then(result => {
        console.log('start OK', result);
      })
      .catch(error => {
        console.warn('start fail', error);
        this.setState({ supported: false });
      })

    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log('launch tag', tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.onStateChanged(
        event => {
          if (event.state === 'on') {
            this.setState({ enabled: true });
          } else if (event.state === 'off') {
            this.setState({ enabled: false });
          } else if (event.state === 'turning_on') {
            // do whatever you want
          } else if (event.state === 'turning_off') {
            // do whatever you want
          }
        }
      )
        .then(sub => {
          this._stateChangedSubscription = sub;
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
        this._requestNdefWrite();
      })
      .catch(error => {
        console.warn('registerTagEvent fail', error)
      })
  }
}

const mapStateToProps = state => ({
  tag: state.gameState.activeTag
});


const RegisterTag = connect(mapStateToProps)(RegisterTagView);

export default RegisterTag;