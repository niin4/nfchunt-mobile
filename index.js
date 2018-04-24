import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import App from './App';
//import App from 'react-native-nfc-manager/example/App'
AppRegistry.registerComponent('NFCApp', () => App);
