/**
 * @format
 */

import {AppRegistry, TextInput,Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {configureReanimatedLogger,ReanimatedLogLevel} from 'react-native-reanimated'

//removes log level from testing app screen

configureReanimatedLogger({
    level:ReanimatedLogLevel.warn,
    strict:false,
})

//font sizec cannot change
if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
}else{
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
}else{
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
