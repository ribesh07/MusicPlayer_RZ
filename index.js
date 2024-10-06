/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

//PlayBack service
import {playBackService} from './musicPlayerServices';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playBackService);
