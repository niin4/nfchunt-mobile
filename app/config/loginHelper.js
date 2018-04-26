import { AsyncStorage} from 'react-native';
import GLOBALS from '../Globals';

const postLogin = (path, user) => {
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


exports.logIn = async function() {
  const user = {};
  user.instanceid = await AsyncStorage.getItem('NFCUser');
  user.password = await AsyncStorage.setItem('NFCPassword');
  const path = `${GLOBALS.BASE_URL}/applogin`;

  postLogin(path, user)
  .then((res) => { return res.json()})
  .then((data) => {
    AsyncStorage.setItem('NFCToken', data.token);
  })
  .catch((err) => {this.setState({error: error})});
}