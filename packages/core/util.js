import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const notSupported = new Error(`Not supported on ${Platform.OS} platform`);
