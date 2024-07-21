import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {initializeI18n} from './src/i18n/init';

initializeI18n();

AppRegistry.registerComponent(appName, () => App);
